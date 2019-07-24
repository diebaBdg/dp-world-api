'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sector = sequelize.define('Sector', {
    name: DataTypes.STRING,
    status: DataTypes.INTEGER,
    email: DataTypes.STRING
  }, {});
  Sector.associate = function(models) {
    // associations can be defined here
    Sector.belongsToMany(models.Document, { through: 'DocumentToSectors' } );
  };
  return Sector;
};