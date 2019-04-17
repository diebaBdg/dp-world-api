'use strict';
module.exports = (sequelize, DataTypes) => {
  const EmployeeAttachment = sequelize.define('EmployeeAttachment', {
    originalName: DataTypes.STRING,
    fileName: DataTypes.STRING,
    validityDate: DataTypes.DATE,
    encoding: DataTypes.STRING,
    mimetype: DataTypes.STRING,
    destination: DataTypes.STRING,
    size: DataTypes.BIGINT,
    path: DataTypes.STRING,
    note: DataTypes.STRING
  }, {});
  EmployeeAttachment.associate = function(models) {
    // associations can be defined here
    EmployeeAttachment.belongsTo(models.AttachmentStatus);
    EmployeeAttachment.belongsTo(models.Employee);
    EmployeeAttachment.belongsTo(models.Document);
  };
  return EmployeeAttachment;
};