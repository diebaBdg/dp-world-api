'use strict';
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
  return Notification;
};