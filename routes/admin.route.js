import express from "express";
import adminModel from "../models/admin.model.js";

const router = express.Router();

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
router.post("/product/add-product", async function(req,res) { 

});
router.post("/product/edit-product", async function (req, res) {
  const name = res.body.newProductName;
  const price = res.body.newPrice;
  const count = res.body.newCount;
  const user = {
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
