import express from "express";
import adminModel from "../models/admin.model.js";
import productModel from "../models/product.model.js";
import multer from "multer";
import config from "../utils/config.js";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const router = express.Router();

cloudinary.config({
    cloud_name: "gearant",
    api_key: "581671485695681",
    api_secret: "RvshNX0rSnZf-Ox4qIGnN0Lt49A",
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: `gearant`,
        allowedFormats: ["jpg", "png"],
    },
});

router.get("/user", async function(req, res, next) {
    let uActive = true;

    const page = req.query.page || 1;
    const limit = 6;

    const total = await adminModel.countUser();

    let nPage = Math.floor(total / limit);
    if (total % limit > 0) {
        nPage++;
    }

    const page_numbers = [];
    for (let i = 1; i <= nPage; i++) {
        page_numbers.push({
            value: i,
            isCurrent: +page === i,
        });
    }

    const offset = (page - 1) * limit;

    const uList = await adminModel.getUserListLimit(limit, offset);

    for (let i in uList) {
        uList[i].No = +i + 1;
    }

    let isFirst = 1;
    let isLast = 1;

    if (uList.length !== 0) {
        isFirst = page_numbers[0].isCurrent;
        isLast = page_numbers[nPage - 1].isCurrent;
    }

    res.render("admin/user", {
        uActive,
        userList: uList,
        layout: "admin.hbs",
        empty: uList.length === 0,
        page_numbers,
        isFirst,
        isLast,
    });
});

router.post("/update-pro", async function(req, res) {
    // console.log("ProID"+req.body.ProID)
    const product = await productModel.findByID(req.body.ProID);

    if (req.body.Price.length > 0) {
        product.Price = +req.body.Price;
    }
    if (req.body.Stock.length > 0) {
        product.Stock = +req.body.Stock;
    }
    const productEntity = {
        ProID: product.ProID,
        Price: product.Price,
        Stock: product.Stock,
        Description: req.body.txtDescription,
    };
    await productModel.updateProduct(productEntity);

    const url = req.headers.referer || "/admin/product";
    return res.redirect(url);
});

router.get("/product", async function(req, res, next) {
    let pActive = true;

    const page = req.query.page || 1;
    const limit = 6;

    const total = await productModel.countProduct();

    let nPage = Math.floor(total / limit);
    if (total % limit > 0) {
        nPage++;
    }

    const page_numbers = [];
    for (let i = 1; i <= nPage; i++) {
        page_numbers.push({
            value: i,
            isCurrent: +page === i,
        });
    }

    const offset = (page - 1) * limit;

    const product = await productModel.findAllLimitBig(limit, offset);

    for (let i in product) {
        const tmp = await productModel.findSold(product[i].ProID);
        product[i].Sold = tmp.Sold;
    }

    let isFirst = 1;
    let isLast = 1;

    if (product.length !== 0) {
        isFirst = page_numbers[0].isCurrent;
        isLast = page_numbers[nPage - 1].isCurrent;
    }

    res.render("admin/product", {
        pActive,
        product,
        layout: "admin.hbs",
        empty: product.length === 0,
        page_numbers,
        isFirst,
        isLast,
    });
});

const upload = multer({ storage: storage });

function findOrder(orders, id) {
    for (let i in orders) {
        if (orders[i]["OrderID"] === id) {
            return i;
        }
    }
    return -1;
}

router.get("/order", async function(req, res, next) {
    let oActive = true;
    const ordList = await adminModel.getOrderList();
    // console.log(ordList)

    let ret = [];

    for (let i in ordList) {
        let orderID = ordList[i]["OrderID"];
        let idx = -1;
        if ((idx = findOrder(ret, orderID)) === -1) {
            ret.push({
                OrderID: orderID,
                Name: ordList[i].Name,
                Orders: [],
                Date: null,
            });
            idx = ret.length - 1;
        }

        ret[idx]["Orders"].push(ordList[i]);
        ret[idx]["Date"] = ordList[i]["Date"];
        // if (ordList[i].State !== config.ordState.PENDING) {
        //     ret[idx].prevent = true;
        // }

        ret[idx].mess=null

        switch(ordList[i].State) {
            case config.ordState.ARRIVING:
                ret[idx].mess = "Approved"
                ret[idx].color='text-primary'
                break;
            case config.ordState.SUCCESS:
                ret[idx].mess = "Success"
                ret[idx].color='text-success'
                break;
            case config.ordState.CANCELED:
                ret[idx].mess = "Canceled"
                ret[idx].color='text-danger'
                break;
        }
    }
    res.render("admin/order", {
        oActive,
        ordList: ret,
        empty: ordList.length === 0,
        layout: "admin.hbs",
    });
});

router.post(
    "/add-product",
    upload.single("fileUpload"),
    async function(req, res) {
        const cat_id = await productModel.findCatID(req.body.child_category);

        const product = {
            ProName: req.body.ProName,
            CatID: cat_id,
            Price: req.body.Price,
            LinkURL: req.file.path,
            Stock: req.body.Stock,
            ProState: true,
            Description: req.body.Description,
        };

        const ret = await productModel.addProduct(product);
        const url = req.headers.referer || "/admin/product";
        return res.redirect(url);
    }
);

router.post("/del-product", async function(req, res) {
    const id = req.body.delete;
    await adminModel.delProduct(id);
    const url = req.headers.referer || "/admin/product";
    return res.redirect(url);
});

router.post("/set-state-order", async function(req, res) {
    var OrderIDApprove = "";
    OrderIDApprove = req.body.OrderIDapprove;
    var OrderIDCancel = "";
    OrderIDCancel = req.body.OrderIDcancel;
    const newState = {
        orderID: null,
        State: null,
    };
    if (parseInt(OrderIDApprove) > 0) {
        newState.orderID = OrderIDApprove;
        newState.State = config.ordState.ARRIVING;
        const listProStockDetail = await adminModel.getProStockDetail(newState.orderID);
        for (let i in listProStockDetail) {
            const proStock = await adminModel.getProStock(listProStockDetail[i].ProID);
            const tempPro = {
                ProID: listProStockDetail[i].ProID,
                Stock: parseInt(proStock.Stock) - parseInt(listProStockDetail[i].Stock),
            };
            await productModel.updateProduct(tempPro);
        }
    }
    if (parseInt(OrderIDCancel) > 0) {
        newState.orderID = OrderIDCancel;
        newState.State = config.ordState.CANCELED;
    }
    await adminModel.updateStateOrder(newState);

    const url = req.headers.referer || "/admin/order";
    return res.redirect(url);
});
export default router;