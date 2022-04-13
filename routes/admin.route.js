import express from 'express';

const router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//     res.render('layouts/admin', {
//         layout: 'admin.hbs',
//     });
// });

router.get('/category-parent', function(req, res, next) {
    res.render('admin/category-parent',{
        layout: 'admin.hbs',
    });
});

router.get('/category-child', function(req, res, next) {
    res.render('admin/category-child',{
        layout: 'admin.hbs',
    });
});


router.get('/product', function(req, res, next) {
    res.render('admin/product', {
        layout: 'admin.hbs',
    });
});

router.get('/order', function(req, res, next) {
    res.render('admin/order', {
        layout: 'admin.hbs',
    });
});

export default router;