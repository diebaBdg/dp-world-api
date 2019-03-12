'use strict';
module.exports = (sequelize, DataTypes) => {
  const CompanyType = sequelize.define('CompanyType', {
    description: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {});
  CompanyType.associate = function(models) {
    // associations can be defined here
    CompanyType.hasMany(models.DocumentToCompanyType);
  };
  return CompanyType;
};