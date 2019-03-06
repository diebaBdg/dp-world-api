'use strict';
module.exports = (sequelize, DataTypes) => {
  const DocumentType = sequelize.define('DocumentType', {
    description: DataTypes.STRING
  }, {});
  DocumentType.associate = function(models) {
    // associations can be defined here
  };
  return DocumentType;
};