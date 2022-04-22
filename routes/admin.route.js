import express from "express";
import adminModel from "../models/admin.model.js";
import productModel from "../models/product.model.js";
import multer from 'multer';
import {v2 as cloudinary} from 'cloudinary';
import {CloudinaryStorage} from "multer-storage-cloudinary";
import userModel from "../models/user.model.js";

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

const upload = multer({storage: storage});

router.get("/user", async function (req, res, next) {
  let uActive = true;
  const page = req.query.page || 1;
  const limit = 6;
  const total = await userModel.countUser();
  let nPage = Math.floor(total/limit);
  if (total % limit > 0) {
    nPage++;
  }
  const page_numbers = [];

  for (let i = 1; i<= nPage; i++) {
    page_numbers.push({
      value: i,
      isCurrent: +page=== i
    });
  }
  const offset = (page - 1) * limit;

  const user = await adminModel.getUserList(limit, offset);
  console.log(user);
  let isFirst = 1;
  let isLast = 1;
  if (user.length !== 0) { 
    isFirst = page_numbers[0].isCurrent;
    isLast = page_numbers[nPage - 1].isCurrent;
  }
    res.render("admin/user", {
    uActive,
    user,
    layout: "admin.hbs",
    empty: user.length === 0,
    page_numbers,
    isFirst,
    isLast
  });
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
});

router.post("/edit-product", async function (req, res) {
  let pActive = true;
  const name = res.body.newProductName;
  const price = res.body.newPrice;
  const count = res.body.newCount;
  const bigCat = res.body.bigCatName;
  // const 
  // console.log(name + " " + price + " " + count);
  let user = {
    Username: req.session.authUser.username,
  };
  if (name != "") user = user + {ProName: name};
  if (price != "") user = user + {Price: price};
  if (count != "") user = user + {Stock: count};
  await adminModel.updateAdmin(user);
  const url = req.headers.referer || "/admin/product";
  return res.redirect(url);
});
router.post("/product/delete-product", async function (req, res) {
  let pActive = true;
  const id = req.body.delete;
  await adminModel.delProduct(id);
  const url = req.headers.referer || "/admin/product";
  return res.redirect(url);
});
router.post("/order/set-state-order", async function (req, res) {
  let oActive = true;
  const state = req.body.newState;
  const OrderID = 1;
  console.log("state: " + state);
  console.log("orderID: " + OrderID);
  const user = {
    orderID: OrderID,
    State: state,
  };
  await adminModel.updateStateOrder(user);
  const url = req.headers.referer || "/admin/order";
  return res.redirect(url);
});
export default router;
