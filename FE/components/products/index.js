var express = require("express");
var router = express.Router();
const productController = require("./productController");
/* GET home page. */
router.get("/", productController.list);

router.get("/:id", productController.item);

router.post("/:id/review", productController.review)


router.post("/:id/order", productController.order)

module.exports = router;
