'use strict';
module.exports = (sequelize, DataTypes) => {
  const AttachmentStatus = sequelize.define('AttachmentStatus', {
    name: DataTypes.STRING
  }, {});
  AttachmentStatus.associate = function(models) {
    // associations can be defined here
    AttachmentStatus.hasMany(models.CompanyAttachment);
    AttachmentStatus.hasMany(models.EmployeeAttachment);
  };
  return AttachmentStatus;
};