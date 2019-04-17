'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Documents', [{
      id: 1,
      description: "Cópia simples do Cartão CNPJ",
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      DocumentTypeId: 1,
      FunctionId: null
    },
    {
      id: 2,
      description: "Comprovante IR",
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      DocumentTypeId: 2,
      FunctionId: 1
    },
    {
      id: 3,
      description: "Cópia do CPF",
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      DocumentTypeId: 3,
      FunctionId: null
    },
    {
      id: 4,
      description: "Exame de saúde periódico",
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      DocumentTypeId: 4,
      FunctionId: null
    }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Documents', null, {});
  }
};
