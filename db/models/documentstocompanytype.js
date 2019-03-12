'use strict';
module.exports = (sequelize, DataTypes) => {
  const DocumentsToCompanyType = sequelize.define('DocumentsToCompanyType', {
    defaultValidity: DataTypes.DATE
  }, {});
  DocumentsToCompanyType.associate = function(models) {
    // associations can be defined here
    DocumentsToCompanyType.belongsTo(models.Document);
    DocumentsToCompanyType.belongsTo(models.CompanyType);
  };
  return DocumentsToCompanyType;
};