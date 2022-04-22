import express from "express";
import adminModel from "../models/admin.model.js";
import productModel from "../models/product.model.js";
import multer from 'multer';
import {v2 as cloudinary} from 'cloudinary';
import {CloudinaryStorage} from "multer-storage-cloudinary";

const router = express.Router();

cloudinary.config({
    cloud_name: 'gearant',
    api_key: '581671485695681',
    api_secret: 'RvshNX0rSnZf-Ox4qIGnN0Lt49A'
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: `gearant`,
        allowedFormats: ['jpg', 'png'],
    },
});

const upload = multer({storage: storage});

router.get("/user", async function (req, res, next) {
  let uActive = true;
  const uList = await adminModel.getUserList();
    res.render("admin/user", {
    uActive,
    userList: uList,
    layout: "admin.hbs",
  });
});

router.post("/update-pro", async function (req, res) {
  // console.log("ProID"+req.body.ProID)
  const product = await productModel.findByID(req.body.ProID)

  if (req.body.Price.length > 0) {
      product.Price = +req.body.Price
  }
  if (req.body.Stock.length > 0) {
      product.Stock = +req.body.Stock
  }
  const productEntity = {
      ProID: product.ProID,
      Price: product.Price,
      Stock: product.Stock,
      Description: req.body.txtDescription
  }
  await productModel.updateProduct(productEntity);

  const url = req.headers.referer || '/admin/product';
  return res.redirect(url);
});

router.get("/product", async function (req, res, next) {
  let pActive = true;

  const page = req.query.page || 1;
  const limit = 8;

  const total = await productModel.countProduct();

  let nPage = Math.floor(total / limit);
  if (total % limit > 0) {
      nPage++;
  }

  const page_numbers = [];
  for (let i = 1; i <= nPage; i++) {
      page_numbers.push({
          value: i,
          isCurrent: +page === i
      });
  }

  const offset = (page - 1) * limit;

  const product = await productModel.findAllLimitBig(limit, offset);

  for(let i in product){
    const tmp = await productModel.findSold(product[i].ProID)
    product[i].Sold = tmp.Sold
  }

  let isFirst = 1;
  let isLast = 1;

  if (product.length !== 0) {
      isFirst = page_numbers[0].isCurrent;
      isLast = page_numbers[nPage - 1].isCurrent;
  }

  res.render('admin/product', {
      pActive,
      product,
      layout: 'admin.hbs',
      empty: product.length === 0,
      page_numbers,
      isFirst,
      isLast
  });
});

router.get("/order", async function (req, res, next) {
  let oActive = true;
  const oList = await adminModel.getOrderList();
  console.log(oList);
  res.render("admin/order", {
    oActive,
    layout: "admin.hbs",
  });
});

router.post("/add-product", upload.single('fileUpload'), async function (req, res) {

    const cat_id = await productModel.findCatID(req.body.child_category);

    const product = {
        ProName: req.body.ProName,
        CatID: cat_id,
        Price: req.body.Price,
        LinkURL: req.file.path,
        Stock: req.body.Stock,
        ProState: true,
        Description: req.body.Description
    }

    const ret = await productModel.addProduct(product);
    const url = req.headers.referer || '/admin/product';
    return res.redirect(url);

    res.redirect('/admin/product')
});

// router.post("/product/edit-product", async function (req, res) {
//     const name = res.body.newProductName;
//     const price = res.body.newPrice;
//     const count = res.body.newCount;
//     let user = {
//         Username: req.session.authUser.username,
//     };
//     if (name !== "") user = user + {ProName: name};
//     if (price !== "") user = user + {Price: price};
//     if (count !== "") user = user + {Stock: count};
//     await adminModel.updateAdmin(user);
//     return res.render("/admin/product", {
//         pAtive,
//         layout: "admin.hbs",
//     });
// });

router.post("/del-product", async function (req, res) {
    const id = req.body.delete;
    await adminModel.delProduct(id);
    const url = req.headers.referer || '/admin/product';
    return res.redirect(url);
});
router.post("/order/set-state-order", async function (req, res) {
  const state = req.body.state;
  const OrderID = req.body.orderid;
  const user = {
      orderID: OrderID,
      State: state,
  };
  await adminModel.updateStateOrder(user);
  return res.render("/admin/order", {
      oAtive,
      layout: "admin.hbs",
  });
});
export default router;
