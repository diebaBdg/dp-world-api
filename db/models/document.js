'use strict';
module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    description: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {});
  Document.associate = function(models) {
    // associations can be defined here
    Document.belongsTo(models.DocumentType);
  };
  return Document;
};