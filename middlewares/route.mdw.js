import express from "express";
import indexRoute from '../routes/index.route.js'
import aboutRoute from '../routes/about.route.js'

// import productRoute from '../routes/product.route.js'
// import adminRoute from '../routes/admin.route.js'
import accountRoute from '../routes/account.route.js'
// import sellerRoute from '../routes/seller.route.js'
// import auth from '../middlewares/auth.mdw.js';

export default function (app) {
    app.use('/', indexRoute);
    app.use('/about', aboutRoute);
    // app.use('/admin', auth, adminRoute);
    app.use('/account', accountRoute);
    // app.use('/profile', auth, accountRoute);
    // app.use('/seller', auth,sellerRoute);
    // app.use('/public',express.static('public'));

    // app.use(function (err, req, res, next) {
    //     res.render('error/505', {
    //         layout: false,
    //     });
    // });
    //
    // app.use(function (req, res, next) {
    //     res.render('error/404', {
    //         layout: false,
    //     });
    // });
}
