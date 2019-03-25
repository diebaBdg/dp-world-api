'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    phone2: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.belongsTo(models.UserType);
    User.belongsTo(models.UserStatus);
    User.belongsTo(models.Sector);
    User.belongsTo(models.Company);
  };
  return User;
};