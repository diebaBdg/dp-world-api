'use strict';
module.exports = (sequelize, DataTypes) => {
  const DocumentToCompanyType = sequelize.define('DocumentToCompanyType', {
    defaultValidity: DataTypes.STRING
  }, {});
  DocumentToCompanyType.associate = function(models) {
    // associations can be defined here
    DocumentToCompanyType.belongsTo(models.Document);
    DocumentToCompanyType.belongsTo(models.CompanyType);
  };
  return DocumentToCompanyType;
};