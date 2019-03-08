'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Documents', [{
      id: 1,
      description: "Formulário de requisição de credenciamento",
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      DocumentTypeId: 1,
      FunctionId: null
    },
    {
      id: 2,
      description: "Certidão estadual",
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      DocumentTypeId: 1,
      FunctionId: 1
    },
    {
      id: 3,
      description: "Certidão da justiça federal",
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      DocumentTypeId: 1,
      FunctionId: null
    },
    {
      id: 4,
      description: "Certidão da polícia federal",
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      DocumentTypeId: 1,
      FunctionId: null
    },
    {
      id: 5,
      description: "Cópia do CTPS (foto, qualificação civil e contrato de trabalho)",
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      DocumentTypeId: 1,
      FunctionId: null
    }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Documents', null, {});
  }
};
