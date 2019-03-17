'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('DocumentToSectors', [{
        SectorId: 1,
        DocumentId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SectorId: 1,
        DocumentId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SectorId: 1,
        DocumentId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('DocumentToSectors', null, {});
  }
};
