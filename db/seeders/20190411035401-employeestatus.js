'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('EmployeeStatuses', [{
      id: 1,
      description: "Pendente de aprovação",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: 2,
      description: "pendente de integração.",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: 3,
      description: "Habilitado",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: 4,
      description: "Desativado",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('EmployeeStatuses', null, {});
  }
};
