'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserType = sequelize.define('UserType', {
    description: DataTypes.STRING
  }, {});
  UserType.associate = function(models) {
    // associations can be defined here
    UserType.belongsToMany(models.Menu, { through: 'MenuToUserTypes' } );
  };
  return UserType;
};