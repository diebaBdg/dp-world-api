'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Integrations', [{
        id: 1,
        date: '2019-05-16 08:00:00',
        vacancies: 3,
        instructor: "Paul Mccartney",
        note: "This integration is a test",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 2,
        date: '2019-05-19 10:00:00',
        vacancies: 4,
        instructor: "John Lennon",
        note: "This integration is a test",
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Integrations', null, {});
  }
};
