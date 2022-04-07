import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('about');
});

router.get('/cart', function(req, res, next) {
    res.render('account/cart');
});


export default router;