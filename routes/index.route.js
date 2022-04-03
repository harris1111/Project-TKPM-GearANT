import express from 'express';
import bodyParser from "body-parser";

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

/* GET home page. */
router.get("/", function(req, res, next) {
    res.render('index');
});

router.get("/about", function(req, res, next) {
    res.render('about');
});

export default router;