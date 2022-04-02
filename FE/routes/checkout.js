var express = require('express');
var router = express.Router();
const orderService = require("../components/order/orderService")
/* GET home page. */
router.get('/', async function (req, res, next) {
  const curOrder = await orderService.viewOrder(req.user._id);
  const total = curOrder.shippingFee + curOrder.total;
  res.render('checkout', { curOrder, total });
});
router.get('/confirm', async function (req, res, next) {
  const curOrder = await orderService.viewOrder(req.user._id);
  let total;
  let isProcess;
  let isConfirmed=true;

  if(curOrder){
    const total = curOrder.shippingFee + curOrder.total;
    curOrder.DateOfPurchase = new Date();
    await orderService.updateOrder(curOrder);
  }else{
    isProcess=true;
    isConfirmed=false;
  }
  res.render('checkout', { curOrder, total, isProcess,isConfirmed});
});
module.exports = router;
