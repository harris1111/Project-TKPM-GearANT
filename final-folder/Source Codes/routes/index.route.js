import express from "express";
import bodyParser from "body-parser";
import productHome from "../models/product.model.js";
import constant from "../utils/config.js";
import userModel from "../models/user.model.js";
import emailModel from "../models/email.model.js";
import bcrypt from "bcrypt";
import reCapt from "express-recaptcha";

const RC = reCapt.RecaptchaV2;
const recaptcha = new RC(
  "6Lf3qxgfAAAAABMD65zmxa6hBnk9dtzUduPW92Fr",
  "6Lf3qxgfAAAAAK-UWhfC28ZcAwZBOKLjlhjI1-rl",
  { callback: "cb" }
);
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

/* GET home page. */
router.get("/", async function (req, res, next) {
  const best_ram = await productHome.findBestSeller(constant.bigCatID.RAM);
  const best_ssd = await productHome.findBestSeller(constant.bigCatID.SSD);
  const best_cpu = await productHome.findBestSeller(constant.bigCatID.CPU);

  for (let i in best_ram) {
    const sold = await productHome.findSold(best_ram[i].ProID);
    best_ram[i].sold = sold.Sold || 0;
  }

  for (let i in best_ssd) {
    const sold = await productHome.findSold(best_ssd[i].ProID);
    best_ssd[i].sold = sold.Sold || 0;
  }

  for (let i in best_cpu) {
    const sold = await productHome.findSold(best_cpu[i].ProID);
    best_cpu[i].sold = sold.Sold || 0;
  }

  res.render("index", {
    layout: "homecat.hbs",
    best_ram,
    best_ssd,
    best_cpu,
  });
});

// login started
router.get(
  "/login",
  recaptcha.middleware.render,
  async function (req, res, next) {
    if (req.session.auth === true) {
      return res.redirect("/");
    } else return res.render("login");
  }
);
router.get(
  "/register",
  recaptcha.middleware.render,
  async function (req, res, next) {
    if (req.session.auth === true) {
      return res.redirect("/");
    } else return res.render("register");
  }
);
router.post("/login", recaptcha.middleware.verify, async function (req, res) {
  console.log(req.recaptcha.error);
  if (!req.recaptcha.error) {
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
    // console.log("login", user)
    // req.session.authUser = userModel.findEmailbyUsername(username);
    if (user.Type === "2") {
      req.session.isAdmin = true;
      res.locals.isAdmin = req.session.isAdmin;
    }

    const url = req.session.retUrl || "/";
    res.redirect(url);
  } else {
    return res.render("login", {
      error_login: "Please verify the captcha!",
    });
  }
});
//login ended

//register started
router.post(
  "/register",
  recaptcha.middleware.verify,
  async function (req, res) {
    if (!req.recaptcha.error) {
      const rawPassword = req.body.password;
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(rawPassword, salt);
      const otp = emailModel.sendOTPRegister(req.body.email);
      const user = {
        Email: req.body.email,
        Username: req.body.username,
        Name: req.body.name,
        Password: hash,
        Address: req.body.address,
        Number: req.body.number,
        Type: 1,
        Valid: false,
        OTP: otp,
      };

      await userModel.add(user);
      req.session.registerUser = req.body.email;
      res.redirect("/confirm-register");
    } else {
      return res.render("register", {
        error_register: "Please check the captcha!"
      });
    }
  }
);

router.post("/confirm-register", async function (req, res) {
  const email = req.session.registerUser;
  const ret = await userModel.findOTP(email);
  const otpInput = req.body.OTP;
  if (otpInput !== ret.OTP) {
    return res.render("otp/confirm-otp-register", {
      error: "OTP is incorrect!",
    });
  }
  req.body.Email = email;
  req.body.OTP = "NULL";
  req.body.Valid = true;
  await userModel.updateUser(req.body);

  req.session.registerUser = null;
  return res.redirect("/register-success");
});
router.get("/username-available", async function (req, res) {
  const username = req.query.username;
  const user = await userModel.findByUsername(username);
  if (user === null) {
    return res.json(true);
  } else {
    return res.json(false);
  }
});

router.get("/email-available", async function (req, res) {
  const email = req.query.email;
  const user = await userModel.findByEmail(email);
  if (user === null) {
    return res.json(true);
  } else {
    return res.json(false);
  }
});
//register ended

//otp
router.get("/forgot-password", async function (req, res) {
  res.render("otp/forgot-password");
});
router.get("/confirm-register", async function (req, res) {
  res.render("otp/confirm-otp-register");
});

router.get("/reset-success", async function (req, res) {
  res.render("otp/reset-success");
});

router.get("/register-success", async function (req, res) {
  res.render("otp/register-success");
});

router.get("/confirm-otp", async function (req, res) {
  res.render("otp/confirm-otp");
});
router.post("/forget-password", async function (req, res) {
  const email = req.body.Email;
  const user = await userModel.findByEmail(email);
  if (user === null) {
    return res.render("otp/forgot-password", {
      error: "Email not found. Please try again!",
    });
  }

  req.session.forgetUser = email;
  const otp = emailModel.sendOTP(email);
  req.body.OTP = otp.toString();
  await userModel.updateUser(req.body);
  return res.redirect("/confirm-otp");
});
// otp ended

router.post("/confirm-otp", async function (req, res) {
  const email = req.session.forgetUser;
  //console.log(email);
  const ret = await userModel.findOTP(email);
  const otpInput = req.body.OTP;

  if (otpInput !== ret.OTP) {
    return res.render("otp/confirm-otp", {
      error: "OTP is incorrect!",
    });
  }
  const password = emailModel.sendNewPassword(email);
  req.body.Email = email;
  req.body.OTP = "NULL";
  req.body.Password = password;
  await userModel.updateUser(req.body);

  req.session.forgetUser = null;
  return res.redirect("/reset-success");
});

//log out
router.post("/logout", async function (req, res) {
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
