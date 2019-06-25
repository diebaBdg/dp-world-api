'use strict';
module.exports = (sequelize, DataTypes) => {
  const CompanyAttachment = sequelize.define('CompanyAttachment', {
    originalName: DataTypes.STRING,
    fileName: DataTypes.STRING,
    validityDate: DataTypes.DATE,
    encoding: DataTypes.STRING,
    mimetype: DataTypes.STRING,
    destination: DataTypes.STRING,
    size: DataTypes.BIGINT,
    path: DataTypes.STRING,
    note: DataTypes.STRING,
    expired: DataTypes.VIRTUAL
  }, {});
  CompanyAttachment.associate = function(models) {
    // associations can be defined here
    CompanyAttachment.belongsTo(models.AttachmentStatus);
    CompanyAttachment.belongsTo(models.Company);
    CompanyAttachment.belongsTo(models.Document);
  };
  return CompanyAttachment;
};