import express from "express";
import adminModel from "../models/admin.model.js";

const router = express.Router();

router.get("/category-parent", function(req, res, next) {
    res.render("admin/category-parent", {
        layout: "admin.hbs",
    });
});

router.get("/category-child", function(req, res, next) {
    res.render("admin/category-child", {
        layout: "admin.hbs",
    });
});

router.get("/product", function(req, res, next) {
    res.render("admin/product", {
        layout: "admin.hbs",
    });
});

router.get("/order", function(req, res, next) {
    res.render("admin/order", {
        layout: "admin.hbs",
    });
});
router.post("order/edit-order-list", async function(req, res) {
    const state = req.body.new_state;
    const user = {
        Username: req.session.authUser.Username,
        new_state: state,
    };
    await adminModel.updateAdmin(user);
    return res.render("/");
});
router.post("order/edit-product", async function(req, res) {
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
    return res.render('/');

});
export default router;