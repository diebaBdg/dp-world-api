'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('CompanyStatuses', [{
        id: 1,
        description: "Solicitação de cadastro",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 2,
        description: "Envio de documentos da empresa",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 3,
        description: "Aprovação de documentos da empresa",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 4,
        description: "Documentos da empresa rejeitados",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 5,
        description: "Habilitado",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 6,
        description: "Desativado",
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('CompanyStatuses', null, {});
  }
};
