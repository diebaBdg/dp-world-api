'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Notifications', [{
        UserId: 1,
        message: 'Notification teste seed 1',
        visualized: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        UserId: 1,
        message: 'Notification teste seed 2',
        visualized: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        EmployeeId: 1,
        message: 'Notification teste seed 3',
        visualized: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Notifications', null, {});
  }
};
