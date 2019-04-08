'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('AttachmentStatuses', [{
        id: 1,
        name: 'Aguardando Aprovação',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 2,
        name: 'Aprovado',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 3,
        name: 'Cancelado',
        createdAt: new Date(),
        updatedAt: new Date()
      },,{
        id: 4,
        name: 'Rejeitado',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('AttachmentStatuses', null, {});
  }
};
