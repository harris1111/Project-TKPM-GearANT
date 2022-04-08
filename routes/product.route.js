import express from 'express';
import productModel from '../models/product.model.js';
import moment from "moment";
import bodyParser from "body-parser";

const router = express.Router();
router.use(bodyParser.urlencoded({extended: false}))

router.get('/detail/:id', async function (req, res) {
    // req.session.retUrl = req.originalUrl;

    const pro_id = req.params.id || 0;
    const product = await productModel.findByID(pro_id);

    if (product.ProState.readInt8() === 1) {
        product.Onair = true;
    }

    const related_products = await productModel.findByCatID(product.CatID, product.ProID);

    res.render('product/product_detail', {
        product,
        related_products,
    });
});

router.get('/byBigCat/:id', async function (req, res) {
    const bigCatId = req.params.id || 0;
    const page = req.query.page || 1;

    const limit = 4;
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

    let isFirst = 1;
    let isLast = 1;

    res.render('product/product', {
        products: list,
        empty: list.length === 0,
        page_numbers,
        isFirst,
        isLast,
        CatName: list[0].BigCatName,
        CatID: bigCatId,
    });
});

router.get('/byCat/:id', async function (req, res) {
    const catId = req.params.id || 0;
    const page = req.query.page || 1;

    const limit = 4;
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

    res.render('product/product', {
        products: list,
        empty: list.length === 0,
        page_numbers,
        isFirst,
        isLast,
        CatName: list[0].CatName,
        CatID: catId,
    });
});

export default router;