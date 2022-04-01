const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    userid: String,

    username: String,
    email_address: String,
    phone: String,
    address: String,
    item: [{
        productid: String,
        image: String,
        productName: String,
        price: Number,
        quantity: Number,
        subtotal: Number,
    }],
    DateOfPurchase: Date,
    total: Number,
    note: String,
    shippingFee: Number,
    status: String,


});
const order = mongoose.model("Order", orderSchema);

module.exports = order;
