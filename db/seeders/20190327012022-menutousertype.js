'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('MenuToUserTypes', [{
      MenuId: 1,
      UserTypeId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      MenuId: 2,
      UserTypeId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      MenuId: 3,
      UserTypeId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      MenuId: 4,
      UserTypeId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      MenuId: 5,
      UserTypeId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      MenuId: 6,
      UserTypeId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      MenuId: 7,
      UserTypeId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      MenuId: 8,
      UserTypeId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      MenuId: 9,
      UserTypeId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      MenuId: 1,
      UserTypeId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      MenuId: 3,
      UserTypeId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('MenuToUserTypes', null, {});
  }
};
