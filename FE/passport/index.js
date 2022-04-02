const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
const userService = require("../components/auth/userService");

passport.use(
  new LocalStrategy(async function (username, password, done) {
    const user = await userService.findByUsername(username);
    if (!user || user.isBan) return done(null, false, { message: "Incorrect username." });
    const isValid = await userService.validPassword(password, user);
    if (!isValid) {
      return done(null, false, { message: "Incorrect password." });
    }

    return done(null, user);
  })
);

passport.serializeUser(function (user, done) {
  user._id = user._id.toString();
  done(null, {_id:user._id,  username: user.username, email_address: user.email_address, address: user.address, phone: user.phone, password: user.password });
});

passport.deserializeUser(async function (user, done) {
  done(null, user);
});

module.exports = passport;
