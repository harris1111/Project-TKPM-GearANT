import express from 'express';
import userModel from '../models/user.model.js'
import config from '../utils/config.js'
import moment from "moment";
import bodyParser from "body-parser";

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }))

/* GET home page. */
router.get('/order', async function (req, res, next) {
    const username = req.session.authUser.Username;
    const ordList = await userModel.findOrderList(username)

    let ret = {}

    for (let i in ordList) {
        let orderID = ordList[i]['OrderID']
        if (!(orderID in ret)) {
            ret[orderID] = {
                'Orders': [],
                'Date': null,
                'State': null,
                'Total': 0
            }
        }
        ret[orderID]['Orders'].push(ordList[i])
        ret[orderID]['Date'] = ordList[i]['Date']

        switch (ordList[i]['State']) {
            case config.ordState.PENDING:
                ordList[i]['State'] = 'Pending'
                break;
            case config.ordState.ARRIVING:
                ordList[i]['State'] = 'Arriving'
                break;
            case config.ordState.SUCCESS:
                ret[orderID].success = true
                ordList[i]['State'] = 'Success'
                break;
        }

        ret[orderID]['State'] = ordList[i]['State']
        ret[orderID]['Total'] += parseInt(ordList[i]['Price']) * parseInt(ordList[i]['Stock'])
    }

    let oActive = true;

    res.render('account/accountOrder', {
        oActive,
        ordList: ret,
        empty: ordList.length === 0,
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

router.post('/cart-del', async (req, res) => {
    const ret = await userModel.delCart(req.body.ProID);
    // console.log(ret);
    const url = req.headers.referer || '/account/cart';
    return res.redirect(url);
});

router.post('/cart-add', async (req, res) => {
    const item = {
        User: req.body.Username,
        ProID: req.body.ProID,
        Stock: req.body.Stock,
        Date: moment().format()
    }

    const ret = await userModel.addCart(item);
    const url = req.headers.referer || '/';
    return res.redirect(url);
});

router.get('/checkout', function (req, res, next) {
    res.render('account/checkout');
});

router.post('/change-address', async (req, res, next) => {
    // console.log('change address post');
    const user = {
        Username: req.session.authUser.Username,
        Address: req.body.new_address
    }
    // console.log(user.Username);
    // console.log(user.Address);
    const ret = await userModel.update(user)

    const user_new = await userModel.findByUsername(req.session.authUser.Username)
    // console.log(user_new)
    req.session.authUser = user_new
    res.locals.authUser = req.session.authUser
    return res.redirect('/');
});
router.post('/change-phone', async (req, res, next) => {
    // console.log('change phone post');
    const user = {
        Username: req.session.authUser.Username,
        Number: req.body.new_phone
    }
    // console.log(user);
    const ret = await userModel.update(user);
    return res.redirect('/');
})
router.post('/change-password', async (req, res, next) => {
    const user_model = await userModel.findByUsername(req.session.authUser.Username);
    // const isEqual = bcrypt.compareSync(req.body.old_password, old_password_sv);
    // if (isEqual === false) {
    //     console.log("Error");
    //     return res.render('/account', {
    //         error: 'Incorrect password!'
    //     });
    // }
    const newPassword = req.body.new_password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newPassword, salt);

    const user = {
        Username: req.session.authUser.Username,
        Password: hash
    }

    const ret = await userModel.update(user);
});

// router.get("/order", function (req, res, next) {
//     let oActive = true;
//     res.render("account/accountOrder", {
//         oActive,
//         layout: "account.hbs",
//     });
// });

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
    res.render("account/changePass", {
        cActive,
        layout: "account.hbs",
    });
});

export default router;