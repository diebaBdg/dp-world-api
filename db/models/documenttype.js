'use strict';
module.exports = (sequelize, DataTypes) => {
  const DocumentType = sequelize.define('DocumentType', {
    description: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {});
  DocumentType.associate = function(models) {
    // associations can be defined here
  };
  return DocumentType;
};