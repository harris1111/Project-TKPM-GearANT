var express = require("express");
var router = express.Router();
const authController = require("./authController");
const passport = require("../../passport");
const loggedInUserGuard = require("../../middlewares/loggedInUserGuard");
router.get("/login", authController.login);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login?wrong-password",
  })
);

router.get("/logout", authController.logout);
router.post("/register", authController.register);
router.post("/account", authController.updateAccount);
router.get('/account',loggedInUserGuard, authController.viewAccount);
// router.get('/activate', authController.activate);
module.exports = router;
