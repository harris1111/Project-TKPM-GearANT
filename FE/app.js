var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
var indexRouter = require("./routes/index");

var productRouter = require("./components/products");
var orderRouter = require("./components/order")
var aboutRouter = require("./routes/about");
var checkoutRouter = require("./routes/checkout");
var accountRouter = require("./routes/account");

const authRouter = require("./components/auth");
const loggedInUserGuard = require("./middlewares/loggedInUserGuard");
const orderService = require("./components/order/orderService")
const passport = require("./passport");

var app = express();

// view engine setup
app.set("views", [
  path.join(__dirname, "views"),
  path.join(__dirname, "components"),
]);
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

app.use(async function (req, res, next) {
  res.locals.user = req.user;

  next();
});




app.use("/", authRouter);
app.use("/", indexRouter);
app.use("/product", express.static(path.join(__dirname, "public")));

app.use("/product", productRouter);

app.use("/cart", express.static(path.join(__dirname, "public")));

app.use("/cart", loggedInUserGuard, orderRouter);
app.use("/about", aboutRouter);

app.use("/checkout", express.static(path.join(__dirname, "public")));
app.use("/checkout", loggedInUserGuard, checkoutRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
