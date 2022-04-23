import express from "express";
import bodyParser from "body-parser";
import productHome from "../models/product.model.js";
import constant from "../utils/config.js";
import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

/* GET home page. */
router.get("/", async function(req, res, next) {
    const best_ram = await productHome.findBestSeller(constant.bigCatID.RAM);
    const best_ssd = await productHome.findBestSeller(constant.bigCatID.SSD);
    const best_cpu = await productHome.findBestSeller(constant.bigCatID.CPU);

    for(let i in best_ram){
        const sold = await productHome.findSold(best_ram[i].ProID)
        best_ram[i].sold = sold.Sold || 0
    }

    for(let i in best_ssd){
        const sold = await productHome.findSold(best_ssd[i].ProID)
        best_ssd[i].sold = sold.Sold || 0
    }

    for(let i in best_cpu){
        const sold = await productHome.findSold(best_cpu[i].ProID)
        best_cpu[i].sold = sold.Sold || 0
    }

    res.render("index", {
        layout:'homecat.hbs',
        best_ram,
        best_ssd,
        best_cpu,
    });
});

// login started
router.get("/login", async function(req, res, next) {
    if (req.session.auth === true) {
        return res.redirect("/");
    } else return res.render("login");
});

router.post("/login", async function(req, res) {
    const username = req.body.username;
    const user = await userModel.findByUsername(username);

    if (user === null) {
        return res.render("login", {
            error_login: "Invalid username or password!",
        });
    }

    const ret = bcrypt.compareSync(req.body.password, user.Password);

    if (ret === false) {
        return res.render("login", {
            error_login: "Invalid username or password!",
        });
    }

    delete user.Password;

    req.session.auth = true;
    req.session.authUser = user;

    if(user.Type==='2'){
        req.session.isAdmin = true;
        res.locals.isAdmin=req.session.isAdmin;
    }

    const url = req.session.retUrl || '/';
    res.redirect(url);
});
//login ended

//register started
router.post("/register", async function(req, res) {
    const rawPassword = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(rawPassword, salt);

    const user = {
        Username: req.body.username,
        Name: req.body.name,
        Password: hash,
        Address: req.body.address,
        Number: req.body.number,
        Type: 1,
    };

    await userModel.add(user);
    res.redirect("/login");
});
router.get('/username-available', async function(req, res) {
    const username = req.query.username;
    const user = await userModel.findByUsername(username);
    if (user === null) {
        return res.json(true);
    } else {
        return res.json(false);
    }
});
//register ended

//log out
router.post("/logout", async function(req, res) {
    req.session.auth = false;
    req.session.authUser = null;
    req.session.retUrl = null;

    //req.session.isSeller = null;
    req.session.isAdmin = null;

    res.locals.auth = req.session.auth;
    res.locals.authUser = req.session.authUser;
    //res.locals.isSeller = req.session.isSeller;
    res.locals.isAdmin = req.session.isAdmin;

    res.redirect("/");
});
//log out
export default router;