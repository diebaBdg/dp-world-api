'use strict';
module.exports = (sequelize, DataTypes) => {
  const Empresa = sequelize.define('Empresa', {
    cnpj: DataTypes.STRING
  }, {});
  Empresa.associate = function(models) {
    // associations can be defined here
  };
  return Empresa;
};