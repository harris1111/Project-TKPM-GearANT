import indexRoute from '../routes/index.route.js'
import accountRoute from '../routes/account.route.js'
import productRoute from '../routes/product.route.js'
import adminRoute from '../routes/admin.route.js'
import auth from '../middlewares/auth.mdw.js';
import authAdmin from '../middlewares/authAdmin.mdw.js';


export default function(app) {
    app.use('/', indexRoute);
    app.use('/product', productRoute);
    app.use('/account', auth, accountRoute);
    app.use('/admin', authAdmin, adminRoute);

    // app.use('/profile', auth, accountRoute);
    // app.use('/seller', auth,sellerRoute);
    // app.use('/public',express.static('public'));

    app.use(function(err, req, res, next) {
        res.render('error')
    });

    app.use(function(req, res, next) {
        res.render('error')
    });
}