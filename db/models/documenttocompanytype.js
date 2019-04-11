'use strict';

const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const DocumentToCompanyType = sequelize.define('DocumentToCompanyType', {
    defaultValidity: DataTypes.STRING
  }, {});
  DocumentToCompanyType.associate = function (models) {
    // associations can be defined here
    DocumentToCompanyType.belongsTo(models.Document);
    DocumentToCompanyType.belongsTo(models.CompanyType);
  };

  DocumentToCompanyType.prototype.generateValidityDate = function () {
    const arrayValidity = this.defaultValidity.split('-');
    const number = arrayValidity[0];
    const period = arrayValidity[1];
    return moment().add(number, period);
  }

  return DocumentToCompanyType;
};