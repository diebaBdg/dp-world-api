'use strict';
module.exports = (sequelize, DataTypes) => {
  const Function = sequelize.define('Function', {
    description: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {});
  Function.associate = function(models) {
    // associations can be defined here
    Function.hasMany(models.Document);
  };
  return Function;
};