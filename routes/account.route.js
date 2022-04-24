import express from 'express';
import userModel from '../models/user.model.js'
import productModel from '../models/product.model.js'
import orderModel from '../models/order.model.js'
import config from '../utils/config.js'
import moment from "moment";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";


const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }))

function findOrder(orders, id) {
  for (let i in orders) {
    if (orders[i]['OrderID'] === id) {
      return i;
    }
  }
  return -1;
}

/* GET home page. */
router.get('/order', async function (req, res, next) {
  const username = req.session.authUser.Username;
  const ordList = await userModel.findOrderList(username)
  // console.log(ordList)

  let ret = []

  let oActive = true;

  for (let i in ordList) {
    let orderID = ordList[i]['OrderID']
    let idx = -1;
    if ((idx = findOrder(ret, orderID)) === -1) {
      ret.push({
        'OrderID': orderID,
        'Orders': [],
        'Date': null,
        'State': null,
        'Total': 0,
      })
      idx = ret.length - 1;
    }

    ret[idx]['Orders'].push(ordList[i])
    ret[idx]['Date'] = ordList[i]['Date']


    ret[idx].preventReceive = true
    switch (ordList[i].State) {
      case config.ordState.PENDING:
        ordList[i].State = 'Pending'
        ret[idx].color = 'text-secondary'
        break;
      case config.ordState.ARRIVING:
        ordList[i].State = 'Arriving'
        ret[idx].color = 'text-primary'
        ret[idx].preventReceive = false
        break;
      case config.ordState.SUCCESS:
        ordList[i].State = 'Success'
        ret[idx].color = 'text-success'
        break;
      case config.ordState.CANCELED:
        ordList[i].State = 'Canceled'
        ret[idx].color = 'text-danger'
        break;
    }

    ret[idx]['State'] = ordList[i].State
    ret[idx]['Total'] += parseInt(ordList[i]['Price']) * parseInt(ordList[i]['Stock'])
  }


  // console.log('return')
  // console.log(ret)

  res.render('account/accountOrder', {
    oActive,
    ordList: ret,
    empty: ordList.length === 0,
    layout: "account.hbs",
  });
});

router.post('/cart-del', async (req, res) => {
  const ret = await userModel.delCart(req.session.authUser.Username, req.body.ProID);
  // console.log(ret);
  const url = req.headers.referer || '/account/cart';
  return res.redirect(url);
});

router.post('/receive', async (req, res) => {
  const OrderID = req.body.OrderID;

  const entity = {
    OrderID,
    State: 3
  }

  // console.log(entity)

  await orderModel.update(entity)

  const url = req.headers.referer || '/account/order';
  return res.redirect(url);
});

router.post('/cart-add', async (req, res) => {
  const item = {
    User: req.body.Username || req.session.authUser.Username,
    ProID: req.body.ProID,
    Stock: req.body.Stock,
    Date: moment().format()
  }

  await userModel.addCart(item);
  const url = req.headers.referer || '/';
  return res.redirect(url);
});

router.post('/checkout-buynow', async function (req, res) {
  const username = req.session.authUser.Username;

  console.log(req.body.buynowID)
  console.log(req.body.buynowStock)

  const ordEntity = {
    User: username,
    Date: moment().format(),
    State: config.ordState.PENDING
  }

  await userModel.addOrder(ordEntity)
  const ordID = await userModel.findRecentOrder(username)

  const product = await productModel.findByID(req.body.buynowID)

  if (+req.body.buynowStock <= +product.Stock) {
    const tmpOrdDetail = {
      OrderID: ordID,
      ProID: req.body.buynowID,
      Stock: +req.body.buynowStock
    }

    await orderModel.addOrdDetail(tmpOrdDetail)
  }

  const url = '/account/order';
  res.redirect(url);
});

router.post('/checkout', async function (req, res) {
  const username = req.session.authUser.Username;
  const cart = await userModel.findCart(username)

  const ordEntity = {
    User: username,
    Date: moment().format(),
    State: config.ordState.PENDING
  }

  await userModel.addOrder(ordEntity)
  const ordID = await userModel.findRecentOrder(username)

  for (let i in cart) {
    if (+cart[i].StockCart <= +cart[i].Stock) {
      // const tempPro = {
      //     ProID: cart[i].ProID,
      //     Stock: +cart[i].Stock - +cart[i].StockCart
      // }
      // await productModel.updateProduct(tempPro)

      const tmpOrdDetail = {
        OrderID: ordID,
        ProID: cart[i].ProID,
        Stock: +cart[i].StockCart
      }

      await orderModel.addOrdDetail(tmpOrdDetail)
      await userModel.delCart(username, cart[i].ProID)
    }
  }

  const url = '/account/order';
  res.redirect(url);
});

router.post("/change-address", async (req, res, next) => {
  // console.log('change address post');
  let aActive = true;
  const user = {
    Username: req.session.authUser.Username,
    Address: req.body.new_address,
  };
  // console.log(user.Username);
  // console.log(user.Address);
  const ret = await userModel.update(user);

  const user_new = await userModel.findByUsername(
    req.session.authUser.Username
  );
  // console.log(user_new)
  req.session.authUser = user_new;
  res.locals.authUser = req.session.authUser;

  const url = '/account/address';
  res.redirect(url);
});
router.post("/change-phone", async (req, res, next) => {
  // console.log('change phone post');
  const user = {
    Username: req.session.authUser.Username,
    Number: req.body.new_phone,
  };
  // console.log(user);
  await userModel.update(user);

  const user_new = await userModel.findByUsername(
    req.session.authUser.Username
  );
  // console.log(user_new)
  req.session.authUser = user_new;
  res.locals.authUser = req.session.authUser;

  const url = '/account/address';
  res.redirect(url);
});

router.post("/change-password", async (req, res, next) => {
  const user_model = await userModel.findByUsername(
    req.session.authUser.Username
  );

  const isEqual = bcrypt.compareSync(req.body.old_password, req.session.authUser.Password);
  if (isEqual === false) {
    req.session.resChange = false
    // return res.render('account/changePass', {
    //     cActive: true,
    //     error: 'Incorrect password! Please try again!',
    //     layout: "account.hbs"
    // });
  } else {
    req.session.resChange = true
  }

  const newPassword = req.body.new_password;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(newPassword, salt);

  const user = {
    Username: req.session.authUser.Username,
    Password: hash,
  };

  await userModel.update(user);

  const user_new = await userModel.findByUsername(
    req.session.authUser.Username
  );

  req.session.authUser = user_new;
  res.locals.authUser = req.session.authUser;

  const url = '/account/changePass';
  res.redirect(url);
});

router.get("/information", function (req, res, next) {
  let iActive = true;
  res.render("account/information", {
    iActive,
    layout: "account.hbs",
  });
});

router.get("/address", function (req, res, next) {
  let aActive = true;
  res.render("account/address", {
    aActive,
    layout: "account.hbs",
  });
});

router.get("/changePass", function (req, res, next) {
  let cActive = true;

  let mess = ""
  let color = "text-danger"
  // console.log(req.session.resChange)

  if (req.session.resChange !== 'undefined' && req.session.resChange !== null) {
    if (req.session.resChange == true) {
      mess = 'Password changed successfully!'
      color = "text-success"
    } else {
      mess = 'Incorrect password! Please try again!'
    }
    req.session.resChange = null
  }

  res.render("account/changePass", {
    cActive,
    mess,
    color,
    layout: "account.hbs",
  });
});

router.get('/cart', async function (req, res, next) {
  const username = req.session.authUser.Username;
  const cart = await userModel.findCart(username)
  let isEmpty = false
  let total = 0

  const user = await userModel.findByUsername(username)
  delete user.Password

  if (cart.length <= 0) {
    isEmpty = true
  } else {
    for (let i in cart) {
      //if product stock > 0
      if (cart[i]['Stock'] >= cart[i]['StockCart']) {
        cart[i]['Stock'] = 'Available'
        cart[i].outstock = false
        cart[i].subtotal = parseInt(cart[i]['StockCart']) * parseInt(cart[i]['Price'])
        total += cart[i].subtotal
      } else {
        cart[i]['Stock'] = 'Out of Stock'
        cart[i].outstock = true
      }
    }
  }

  res.render('account/cart', {
    cart,
    total,
    isEmpty,
    user
  });
});

export default router;