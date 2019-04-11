'use strict';
module.exports = (sequelize, DataTypes) => {
  const EmployeeStatus = sequelize.define('EmployeeStatus', {
    description: DataTypes.STRING
  }, {});
  EmployeeStatus.associate = function(models) {
    // associations can be defined here
    EmployeeStatus.hasMany(models.Employee);
  };
  return EmployeeStatus;
};