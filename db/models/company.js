'use strict';
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    cnpj: DataTypes.STRING,
    socialName: DataTypes.STRING,
    businessName: DataTypes.STRING,
    address: DataTypes.STRING,
    number: DataTypes.STRING,
    complement: DataTypes.STRING,
    district: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    cep: DataTypes.STRING,
    phone: DataTypes.STRING,
    inscricaoEstadual: DataTypes.STRING,
    site: DataTypes.STRING
  }, {});
  Company.associate = function(models) {
    // associations can be defined here
    Company.belongsTo(models.CompanyStatus);
    Company.belongsTo(models.CompanyType);
    Company.belongsTo(models.Sector);
    Company.belongsTo(Company);
  };
  return Company;
};