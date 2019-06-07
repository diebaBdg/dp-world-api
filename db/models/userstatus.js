'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserStatus = sequelize.define('UserStatus', {
    description: DataTypes.STRING
  }, {});
  UserStatus.associate = function(models) {
    // associations can be defined here
  };
  return UserStatus;
};