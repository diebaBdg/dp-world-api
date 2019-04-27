'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('EmployeeStatuses', [{
      id: 1,
      description: "Envio de documentos",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: 2,
      description: "Aprovação de documentos",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: 3,
      description: "Documentos rejeitados",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: 4,
      description: "Pendente de integração",
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
    return queryInterface.bulkDelete('EmployeeStatuses', null, {});
  }
};
