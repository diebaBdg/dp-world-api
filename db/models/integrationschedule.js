'use strict';
module.exports = (sequelize, DataTypes) => {
  const IntegrationSchedule = sequelize.define('IntegrationSchedule', {
    showedUp: DataTypes.BOOLEAN
  }, {});
  IntegrationSchedule.associate = function(models) {
    // associations can be defined here
    IntegrationSchedule.belongsTo(models.Integration);
    IntegrationSchedule.belongsTo(models.Employee);
  };
  return IntegrationSchedule;
};