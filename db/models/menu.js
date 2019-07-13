'use strict';
module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    link: DataTypes.STRING,
    name: DataTypes.STRING,
    icon: DataTypes.STRING
  }, {});
  Menu.associate = function(models) {
    // associations can be defined here
    Menu.hasMany(Menu,{as: 'Menu1'});
    Menu.hasMany(Menu,{as: 'Menu2'});
    Menu.belongsToMany(models.UserType, { through: 'MenuToUserTypes' } );
  };
  return Menu;
};