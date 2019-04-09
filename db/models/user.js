'use strict';
const md5 = require('md5');
const emailHelper = require('../../helpers/email-helper');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    phone2: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});

  User.associate = function (models) {
    // associations can be defined here
    User.belongsTo(models.UserType);
    User.belongsTo(models.UserStatus);
    User.belongsTo(models.Sector);
    User.belongsTo(models.Company);
  };

  // Instance Methods
  User.prototype.enableAndSendEmail = async function (password) {
    password = password ? password : Math.random().toString(36).slice(-8);
    let mailOptions = {
      from: '"noreply dp-world" noreply@speedsoftware.com.br',
      to: this.email,
      subject: "Cadastro",
      html: ` <p><b>Cadastro na dp-world</b></p>
              <p>${this.name}, seu cadastro foi aprovado e você pode realizar login com os dados abaixo.</p>
              <br><p>Usuário: ${this.email}</p>
              <p>Senha: ${password}</p>`
    };
    await emailHelper.sendMail(mailOptions);
    this.password = md5(password);
    await this.save();
  }

  User.prototype.sendRegistationRequestEmail = async function () {
    let mailOptions = {
      from: '"noreply dp-world" noreply@speedsoftware.com.br',
      to: this.email,
      subject: "Cadastro",
      html: ` <p><b>Cadastro na dp-world</b></p>
              <p>${this.name}, seus dados foram enviados para a avaliação de cadastro. Após confirmados, você receberá um email para realizar o envio dos documentos.</p>`
    };
    return emailHelper.sendMail(mailOptions);
  }

  User.prototype.SendEmail = async function (msg) {
    let mailOptions = {
      from: '"noreply dp-world" noreply@speedsoftware.com.br',
      to: this.email,
      subject: "Cadastro",
      html: msg
    };
    return emailHelper.sendMail(mailOptions);
  }

  return User;
};