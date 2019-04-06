'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('AttachmentStatuses', [{
        name: 'Aguardando Aprovação',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Aprovado',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Cancelado',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('AttachmentStatuses', null, {});
  }
};
