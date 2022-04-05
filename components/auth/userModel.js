const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email_address: String,
  phone: String,
  address: String,
  isBan: Boolean,
  activationString: String,
});
module.exports = mongoose.model("User", userSchema);


