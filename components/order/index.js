var express = require("express");
var router = express.Router();
const orderController = require("./orderController");
/* GET home page. */

router.get("/:id", orderController.item);

router.get("/", orderController.list);



router.get("/:id/delete", orderController.deleteItem);

module.exports = router;
