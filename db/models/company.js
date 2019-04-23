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
    site: DataTypes.STRING,
    objectOfContract: DataTypes.STRING
  }, {});
  Company.associate = function (models) {
    // associations can be defined here
    Company.belongsTo(models.CompanyStatus);
    Company.belongsTo(models.CompanyType);
    Company.belongsTo(models.Sector);
    Company.belongsTo(Company);
    Company.hasMany(models.User);
    Company.hasMany(models.CompanyAttachment);
    Company.hasMany(models.Employee);
  };

  Company.prototype.getStatusFlow = function () {
    return [{
      status: 1, next: 2
    }, {
      status: 2, next: 3
    }, {
      status: 3, next: 4
    }, {
      status: 4, next: 3
    }, {
      status: 3, next: 5
    }, {
      status: 5, next: 6
    }]
  }

  Company.prototype.isStatusFlowValid = function (newStatus) {
    const flowList = this.getStatusFlow();
    const flow = flowList.find(item => item.status == this.CompanyStatusId && item.next == newStatus);
    return flow ? true : false;
  }

  // Company.prototype.getAmountEmployeesPending = function () {
  //   return 10;
  // }

  return Company;
};