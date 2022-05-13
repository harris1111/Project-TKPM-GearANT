import sender from "../utils/email.js";
import bcrypt from "bcryptjs";
import numeral from 'numeral';

export default {
    sendOTP(receiver) {
        const otp = Math.floor(100000 + Math.random() * 900000);
        const otpStr = 'This is your OTP. Please do not share it with anyone.\n' + otp;
        const mailOptions = {
            from: "Gearant <gearant@gmail.com>",
            to: receiver,
            subject: 'Reset password',
            text: otpStr
        };
        sender.sendMail(mailOptions);
        return otp;
    },
    sendOTPRegister(receiver) {
        const otp = Math.floor(100000 + Math.random() * 900000);
        const otpStr = 'This is your OTP. Please do not share it with anyone.\n' + otp;
        const mailOptions = {
            from: "Gearant <gearant@gmail.com>",
            to: receiver,
            subject: 'Account verification',
            text: otpStr
        };

        sender.sendMail(mailOptions);
        return otp;
    },

    checkoutSend(receiver,order) {
        const ordID = order.OrderID;
        const stock = order.Stock;
        const proname = order.ProName;
        const price = +order.Price* +stock;
        const Price = new Intl.NumberFormat('en-US').format(+order.Price);
        const curPrice = new Intl.NumberFormat('en-US').format(price);

        const str = 'Your order has been placed.\nThank you for choosing GearANT.\n'
        +`OrderID: ${ordID}\n
        Product name: ${proname}\n
        Price: ${Price}\n
        Quantity: ${stock}\n
        Total: ${curPrice}`

        const mailOptions = {
            from: "Gearant <gearant@gmail.com>",
            to: receiver,
            subject: 'Your order has been placed.',
            text: str
        };

        sender.sendMail(mailOptions);
    },

    checkoutSendMul(receiver,ordId,cart,total) {
        const curTotal = new Intl.NumberFormat('en-US').format(total);

        let str='Your order has successfully placed.\nThank you for choosing GearANT.\n'
        +`OrderID: ${ordId}\n`
        +`Total: ${curTotal}\n`
        +'Datail\n\n';

        for(let i in cart){
            // const ordID = cart[i].OrderID;
            const stock = cart[i].StockCart;
            const proname = cart[i].ProName;
            const price = +cart[i].Price* +stock;
            const curPrice = new Intl.NumberFormat('en-US').format(price);
            const subtotal = +price*+stock;
            const curSub = new Intl.NumberFormat('en-US').format(subtotal);

            str +=`Product name: ${proname}\n
            Price: ${curPrice}\n
            Quantity: ${stock}\n
            Subtotal: ${curSub}\n\n`
        }
        const mailOptions = {
            from: "Gearant <gearant@gmail.com>",
            to: receiver,
            subject: 'Your order has successfully placed.',
            text: str
        };

        sender.sendMail(mailOptions);
    },

    sendNewPassword(receiver) {
        let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let passwordLength = 8;
        let password = "";

        for (let i = 0; i <= passwordLength; i++) {
            let randomNumber = Math.floor(Math.random() * chars.length);
            password += chars.substring(randomNumber, randomNumber + 1);
        }

        const passStr = 'This is your new password: ' + password +
            '\nPlease do not share it with anyone. \nYour password has been encrypted so that only you know it. You can change it later in settings';
        const mailOptions = {
            from: "Gearant <horizon@gmail.com>",
            to: receiver,
            subject: 'New password',
            text: passStr
        };

        sender.sendMail(mailOptions);

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    }
}