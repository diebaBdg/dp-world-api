'use strict';
const emailHelper = require('../../helpers/email-helper');

module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    message: DataTypes.STRING,
    visualized: DataTypes.BOOLEAN
  }, {});

  Notification.associate = function(models) {
    // associations can be defined here
    Notification.belongsTo(models.Employee);
    Notification.belongsTo(models.User);
  };

  Notification.prototype.sendEmail = async function () {
    const user = await this.getUser();
    // const employee = await this.getEmployee();
    // const to = [user.email, employee.email];
    let mailOptions = {
      from: '"noreply dp-world" noreply@speedsoftware.com.br',
      to: user.email,
      subject: "Notificação",
      html: this.message
    };
    return emailHelper.sendMail(mailOptions);
  }

  return Notification;
};