const nodemailer = require('nodemailer');
const otp = require('../model/otp');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    auth: {
        user: 'devendranvemula@gmail.com',
        pass: 'wvfocfhsqqvkxikc'
    }
});

const sendOtp = ({ reciver, otp }) => {
    const mailOptions = {
        from: 'devendranvemula@gmail.com',
        to: reciver,
        subject: 'OTP',
        text: otp,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: ' + info.response);
        }
        transporter.close();
    });
};


module.exports = {
    sendOtp
}