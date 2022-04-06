import express from 'express';
import bodyParser from "body-parser";
import productHome from "../models/product.model.js";
import constant from "../utils/config.js"

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

/* GET home page. */
router.get("/", async function (req, res, next) {
    const best_ram = await productHome.findBestSeller(constant.bigCatID.RAM);
    const best_ssd = await productHome.findBestSeller(constant.bigCatID.SSD);
    const best_cpu = await productHome.findBestSeller(constant.bigCatID.CPU);

    console.log(best_ram)

    res.render('index', {
        best_ram,
        best_ssd,
        best_cpu
    });
});


router.get("/login", async function (req, res, next) {
    res.render('login');
});
export default router;