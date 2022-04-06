import express from 'express';
import productModel from '../models/product.model.js';
import moment from "moment";
import bodyParser from "body-parser";

const router = express.Router();
router.use(bodyParser.urlencoded({extended: false}))

// router.get('/check-bid', async function (req, res) {
//     const queryPrice = +req.query.price;
//     const proID = req.query.pro;
//
//     let product = await productModel.findByProID(proID);
//     let maxPrice = product.MaxPrice;
//
//     // console.log(queryPrice);
//     // console.log(maxPrice);
//
//
//     if (product.CurrentWinner === null) {
//         return res.json(true);
//     }
//
//     if (queryPrice <= maxPrice) {
//         return res.json(false);
//     } else {
//         return res.json(true);
//     }
// });

// router.post('/buynow', async function (req, res) {
//     const email = req.session.authUser.Email;
//     const ProID = req.body.ProID;
//     const today = moment().format();
//     const bidder = await userModel.findByEmail(email);
//     const product = await productModel.findByProID(ProID);
//     const Price = product.SellPrice;
//     const currentWinner = req.body.CurrentWinner || null;
//
//     let item = {
//         ProID: ProID,
//         Bidder: email,
//         OrderDate: today
//     }
//
//     // console.log("Current",currentWinner);
//     if(currentWinner != null){
//         if(currentWinner!==email){
//             // console.log("Current",currentWinner);
//             await emailModel.sendBidDefeatEnd(currentWinner,product.ProName);
//         }
//     }
//     await emailModel.sendBidEndSuccess(email,bidder.Name,product.Seller,product.ProName,Price);
//     await cartModel.checkout(item);
//
//     const ret = '/product/detail/'+ProID;
//     const url = req.headers.referer || ret;
//     return res.redirect(url);
// });

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

// router.get('/byBigCat/:id', async function (req, res) {
//     const bigCatId = req.params.id || 0;
//     const page = req.query.page || 1;
//     const type = req.query.type || 1; //0: price , 1: time
//     let checkType = false;
//
//     if (type == 0)
//         checkType = false;
//     else checkType = true;
//
//     const limit = 8;
//     const raw = await productModel.countBigCatId(bigCatId);
//     const total = raw[0][0].amount;
//
//     let nPage = Math.floor(total / limit);
//     if (total % limit > 0) {
//         nPage++;
//     }
//
//     const page_numbers = [];
//     for (let i = 1; i <= nPage; i++) {
//         page_numbers.push({
//             value: i,
//             isCurrent: +page === i
//         });
//     }
//
//     const offset = (page - 1) * limit;
//     const list = await productModel.findPageByBigCatId(bigCatId, limit, offset, type);
//     for (let i = 0; i < list.length; i++) {
//         const pic = await productModel.findFirstImageByProID(list[i].ProID);
//         list[i].url = pic.LinkURL || '';;
//     }
//
//     let isFirst = 1;
//     let isLast = 1;
//     for (let i in list) {
//         list[i].noBid = false;
//         list[i].user = req.session.authUser;
//         const countBidding = await productModel.countBidding(list[i].ProID);
//         list[i].countBidding = countBidding[0].count;
//         if (list[i].Price == null) {
//             list[i].noBid = true;
//         } else {
//             let bidRet = await productModel.findBidding(list[i].ProID);
//             list[i].biddingHighest = bidRet[0];
//         }
//
//         if (req.session.auth !== false) {
//             let inWish = await productModel.isInWishList(list[i].ProID, req.session.authUser.Email);
//             if (inWish.length > 0) {
//                 list[i].isWish = true;
//             }
//         }
//
//         if(moment.now() - list[i].UploadDate <= 600000)
//             list[i].isNew = true;
//
//         if(list[i].SellPrice != null)
//             list[i].isBuyNow = true;
//     }
//
//     if (list.length !== 0) {
//         isFirst = page_numbers[0].isCurrent;
//         isLast = page_numbers[nPage - 1].isCurrent;
//     }
//
//     const href = "byBigCat"
//
//     res.render('vwProduct/byCat', {
//         products: list,
//         empty: list.length === 0,
//         page_numbers,
//         isFirst,
//         isLast,
//         catName: list[0].BigCatName,
//         type,
//         href,
//         CatID: bigCatId,
//         checkType
//     });
// });
//
// router.get('/byCat/:id', async function (req, res) {
//     const CatID = req.params.id || 0;
//     const page = req.query.page || 1;
//     const type = req.query.type || 1; //0: price , 1: time
//
//     let checkType = false;
//
//     if (type == 0)
//         checkType = false;
//     else checkType = true;
//
//     const limit = 8;
//     const raw = await productModel.countCatID(CatID);
//     const total = raw[0][0].amount;
//
//     let nPage = Math.floor(total / limit);
//     if (total % limit > 0) {
//         nPage++;
//     }
//
//     const page_numbers = [];
//     for (let i = 1; i <= nPage; i++) {
//         page_numbers.push({
//             value: i,
//             isCurrent: +page === i
//         });
//     }
//
//     const offset = (page - 1) * limit;
//     const list = await productModel.findPageByCatID(CatID, limit, offset, type);
//     for (let i = 0; i < list.length; i++) {
//         const pic = await productModel.findFirstImageByProID(list[i].ProID);
//         list[i].url = pic.LinkURL || '';;
//     }
//
//     let isFirst = 1;
//     let isLast = 1;
//
//     for (let i in list) {
//         list[i].noBid = false;
//         list[i].user = req.session.authUser;
//         const countBidding = await productModel.countBidding(list[i].ProID);
//         list[i].countBidding = countBidding[0].count;
//         if (list[i].Price == null) {
//             list[i].noBid = true;
//         } else {
//             let bidRet = await productModel.findBidding(list[i].ProID);
//             list[i].biddingHighest = bidRet[0];
//         }
//
//         if (req.session.auth != false) {
//             let inWish = await productModel.isInWishList(list[i].ProID, req.session.authUser.Email);
//             if (inWish.length > 0) {
//                 list[i].isWish = true;
//             }
//         }
//
//         if(moment.now() - list[i].UploadDate <= 600000)
//             list[i].isNew = true;
//
//         if(list[i].SellPrice != null)
//             list[i].isBuyNow = true;
//     }
//
//     if (list.length !== 0) {
//         isFirst = page_numbers[0].isCurrent;
//         isLast = page_numbers[nPage - 1].isCurrent;
//     }
//
//     const href = "byCat"
//     res.render('vwProduct/byCat', {
//         products: list,
//         empty: list.length === 0,
//         page_numbers,
//         isFirst,
//         isLast,
//         type,
//         CatID,
//         catName: list[0].CatName,
//         href,
//         checkType
//     });
// });

export default router;