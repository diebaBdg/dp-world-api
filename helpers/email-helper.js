'use strict';
const nodemailer = require("nodemailer");

exports.sendMail = (mailOptions, callback) => {
    // verificando se é um email válido
    if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i.test(mailOptions.to)){
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'noreply@speedsoftware.com.br',
                pass: 'i8GnvK7hZBUm'
            }
        });
        return transporter.sendMail(mailOptions, callback);
    }else{
        console.log(`Error: Não foi possivel enviar a mensagem pois ${mailOptions.to} não é um email válido.`)
    }
}

