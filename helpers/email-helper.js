'use strict';
const nodemailer = require("nodemailer");

exports.sendMail = (mailOptions, callback) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'noreply@speedsoftware.com.br',
            pass: 'i8GnvK7hZBUm'
        }
    });
    transporter.sendMail(mailOptions, callback);
}

