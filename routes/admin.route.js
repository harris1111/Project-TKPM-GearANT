import express from "express";
import adminModel from "../models/admin.model.js";
import productModel from "../models/product.model.js";
import multer from 'multer';
import {v2 as cloudinary} from 'cloudinary';
import { CloudinaryStorage } from "multer-storage-cloudinary";

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

const upload = multer({ storage: storage });

router.get("/user", function (req, res, next) {
  let uActive = true;
  res.render("admin/user", {
    uActive,
    layout: "admin.hbs",
  });
});

router.get("/product", function (req, res, next) {
  let pActive = true;
  res.render("admin/product", {
    pActive,
    lcCategories: res.locals.lcCategories,
    layout: "admin.hbs",
  });
});

router.get("/order", function (req, res, next) {
  let oActive = true;
  res.render("admin/order", {
    oActive,
    layout: "admin.hbs",
  });
});

router.post("/add-product", upload.single('fileUpload'),async function(req,res) {
  const product = {
    ProName:req.body.ProName,
    CatID:+req.body.child_category+1,
    Price:req.body.Price,
    LinkURL:req.file.path,
    Stock:req.body.Stock,
    ProState:true,
    Description:"test"
  }
  const ret = await productModel.addProduct(product);
  //console.log(ret);
  const url = req.headers.referer || '/admin/product';
  return res.redirect(url);

  res.redirect('/admin/product')
});

router.post("/product/edit-product", async function (req, res) {
  const name = res.body.newProductName;
  const price = res.body.newPrice;
  const count = res.body.newCount;
  let user = {
    Username: req.session.authUser.username,
  };
  if (name != "") user = user + { ProName: name };
  if (price != "") user = user + { Price: price };
  if (count != "") user = user + { Stock: count };
  await adminModel.updateAdmin(user);
  return res.render("/admin/product", {
    pAtive,
    layout: "admin.hbs",
  });
});
router.post("/product/delete-product", async function (req, res) {
  const id = req.body.delete;
  await adminModel.delProduct(id);
  return res.render("/admin/product", {
    pAtive,
    layout: "admin.hbs",
  });
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
