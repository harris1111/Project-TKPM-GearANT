const bcrypt = require("bcrypt");
const randomstring = require("randomstring");
const nodemailer = require("nodemailer");

const userModel = require("./userModel");

exports.findByUsername = (username) => {
  return userModel
    .findOne({
      username: username,
    })
    .lean();
};

exports.findByEmail = (email) =>{
  return userModel.findOne({email_address : email,}).lean();
};

exports.validPassword = (password, user) => {
  return bcrypt.compare(password, user.password);
};



exports.validPasswordForChangePass = (password, passwordInDatabase) => {
  return bcrypt.compare(password, passwordInDatabase);
};

exports.register = async (username, email, password) => {
  const passwordHash = await bcrypt.hash(password, 10);
  const activationString= randomstring.generate();
  await userModel.create({
    username: username,
    email_address: email,
    password: passwordHash,
    isBan: false,
    activationString: activationString,
  });
};



exports.update = (user) => {
  userModel.findOneAndUpdate(
    { _id: user._id },
    user,
    { new: true },
    (err, doc) => {
      if (err) {
        console.log(err);
      }
    }
  );
};
