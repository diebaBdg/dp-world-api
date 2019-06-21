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
    const employee = await this.getEmployee();
    const email = user?user.email:employee.email;
    let mailOptions = {
      from: '"noreply dp-world" noreply@speedsoftware.com.br',
      to: email,
      subject: "Notificação",
      //html: this.message
      html: `
      <table style="border:1px solid #cccccc; width: 500px; text-align:center">
        <tr>
            <td style="padding:10px">
                <img style="width: 300px" src="http://demo.weecode.com.br/cdi/images/logo.png" />
            </td>
        </tr>
        <tr>
            <td style="font-size: 20px; font-family: Arial, Helvetica, sans-serif; border-top:1px solid #eeeeee; padding-top:20px; padding-bottom:20px">
                
                ${this.message}
        
            </td>
        </tr>
      </table>`
    };
    return emailHelper.sendMail(mailOptions);
  }

  return Notification;
};