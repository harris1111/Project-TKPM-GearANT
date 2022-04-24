import express from 'express';
import productModel from '../models/product.model.js';
import moment from "moment";
import bodyParser from "body-parser";
import userModel from "../models/user.model.js";

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }))

router.get('/detail/:id', async function(req, res) {
    req.session.retUrl = req.originalUrl;

    const pro_id = req.params.id || 0;
    const product = await productModel.findByID(pro_id);

    const sold = await productModel.findSold(pro_id)

    if (product.Description.length < 1) {
        product.Description = "No description."
    }

    product.sold = sold.Sold || 0

    product.outstock = product.Stock === 0

    const related_products = await productModel.findByCatID(product.CatID, product.ProID);

    for (let i in related_products) {
        const sold = await productModel.findSold(related_products[i].ProID)
        related_products[i].Sold = sold.Sold || 0
    }

    res.render('product/detail', {
        layout: 'homecat.hbs',
        product,
        related_products,
    });
});

router.get('/byBigCat/:id', async function(req, res) {
    const bigCatId = req.params.id || 0;
    const page = req.query.page || 1;

    const limit = 8;
    const raw = await productModel.countBigCatId(bigCatId);
    const total = raw[0][0].amount;

    let nPage = Math.floor(total / limit);
    if (total % limit > 0) {
        nPage++;
    }

    const page_numbers = [];
    for (let i = 1; i <= nPage; i++) {
        page_numbers.push({
            value: i,
            isCurrent: +page === i
        });
    }

    const offset = (page - 1) * limit;
    const list = await productModel.findPageByBigCatId(bigCatId, limit, offset);

    for (let i in list) {
        const sold = await productModel.findSold(list[i].ProID)
        list[i].sold = sold.Sold || 0
    }

    let isFirst = 1;
    let isLast = 1;

    if (list.length !== 0) {
        isFirst = page_numbers[0].isCurrent;
        isLast = page_numbers[nPage - 1].isCurrent;
    }

    res.render('product/byCat', {
        layout: 'homecat.hbs',
        products: list,
        empty: list.length === 0,
        page_numbers,
        isFirst,
        isLast,
        CatName: list[0].BigCatName,
        CatID: bigCatId,
    });
});

router.get('/buynow', async function(req, res, next) {
    const username = req.session.authUser.Username;
    const pro_id = req.query.ProID;
    const quantity = req.query.Stock;

    const item={
        ProID:pro_id,
        Stock:quantity
    }

    const product = await productModel.findByID(pro_id)
    const user = await userModel.findByUsername(username)
    delete user.Password

    const total = +product.Price * +quantity;

    const cart = []
    cart.push(product)
    product.StockCart = quantity
    product.Stock = 'Available'
    product.subtotal = total

    res.render('account/cart', {
        cart,
        total,
        item,
        buynow:true,
        isEmpty: false,
        user
    });
});

router.get('/byCat/:id', async function(req, res) {
    const catId = req.params.id || 0;
    const page = req.query.page || 1;

    const limit = 8;
    const raw = await productModel.countCatId(catId);
    const total = raw[0][0].amount;

    let nPage = Math.floor(total / limit);
    if (total % limit > 0) {
        nPage++;
    }

    const page_numbers = [];
    for (let i = 1; i <= nPage; i++) {
        page_numbers.push({
            value: i,
            isCurrent: +page === i
        });
    }

    const offset = (page - 1) * limit;
    const list = await productModel.findPageByCatId(catId, limit, offset);

    let isFirst = 1;
    let isLast = 1;

    if (list.length !== 0) {
        isFirst = page_numbers[0].isCurrent;
        isLast = page_numbers[nPage - 1].isCurrent;
    }

    for (let i in list) {
        const sold = await productModel.findSold(list[i].ProID)
        list[i].sold = sold.Sold || 0
    }

    res.render('product/byCat', {
        layout: 'homecat.hbs',
        products: list,
        empty: list.length === 0,
        page_numbers,
        isFirst,
        isLast,
        CatName: list[0].CatName,
        CatID: catId,
    });
});

router.get('/search', async function(req, res) {
    const kw = req.query.keyword;
    const page = req.query.page || 1;

    const limit = 8;
    const total = await productModel.countByKW(kw);

    let nPage = Math.floor(total / limit);
    if (total % limit > 0) {
        nPage++;
    }

    const page_numbers = [];
    for (let i = 1; i <= nPage; i++) {
        page_numbers.push({
            value: i,
            isCurrent: +page === i
        });
    }

    const offset = (page - 1) * limit;
    const list = await productModel.findPageByKW(kw, limit, offset);

    let isFirst = 1;
    let isLast = 1;

    if (list.length !== 0) {
        isFirst = page_numbers[0].isCurrent;
        isLast = page_numbers[nPage - 1].isCurrent;
    }

    for (let i in list) {
        const sold = await productModel.findSold(list[i].ProID)
        list[i].sold = sold.Sold || 0
    }

    res.render('product/search', {
        layout: 'homecat.hbs',
        keyword: kw,
        products: list,
        empty: list.length === 0,
        page_numbers,
        isFirst,
        isLast
    });
});

export default router;