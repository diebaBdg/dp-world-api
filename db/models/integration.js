'use strict';
module.exports = (sequelize, DataTypes) => {
  const Integration = sequelize.define('Integration', {
    date: DataTypes.DATE,
    vacancies: DataTypes.INTEGER,
    instructor: DataTypes.STRING,
    note: DataTypes.STRING
  }, {});
  Integration.associate = function(models) {
    // associations can be defined here
    Integration.hasMany(models.IntegrationSchedule);
  };
  return Integration;
};