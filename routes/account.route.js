import express from 'express';
import bcrypt from 'bcrypt';
import moment from 'moment';
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('account/account');
});

router.get('/cart', function(req, res, next) {
    res.render('account/cart');
});

router.get('/checkout', function(req, res, next) {
    res.render('account/checkout');
});


export default router;