'use strict';
module.exports = (sequelize, DataTypes) => {
  const Integration = sequelize.define('Integration', {
    date: DataTypes.DATE,
    vacancies: DataTypes.INTEGER,
    instructor: DataTypes.STRING,
    note: DataTypes.TEXT,
    closed: DataTypes.BOOLEAN
  }, {});
  Integration.associate = function(models) {
    // associations can be defined here
    Integration.hasMany(models.IntegrationSchedule);
    Integration.belongsToMany(models.User, { through: 'InstructorToIntegration' } );
  };
  return Integration;
};