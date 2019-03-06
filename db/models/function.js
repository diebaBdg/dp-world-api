'use strict';
module.exports = (sequelize, DataTypes) => {
  const Function = sequelize.define('Function', {
    description: DataTypes.STRING
  }, {});
  Function.associate = function(models) {
    // associations can be defined here
  };
  return Function;
};