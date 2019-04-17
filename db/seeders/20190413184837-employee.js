'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Employees', [{
      id: 1,
      name: "João",
      birthDate: "2009-01-07T04:36:14.000Z",
      sector: "Compras",
      rg: "MG45875255",
      cpf: "10463904656",
      phone: "999223568",
      email: "velosojonathan55@gmail.com",
      address: "aaa",
      number: "aaa",
      complement: "aaa",
      district: "aaa",
      city: "aa",
      state: "aaa",
      country: "aaa",
      cep: "aaa",
      createdAt: new Date(),
      updatedAt: new Date(),
      CompanyId: 1,
      FunctionId: 1,
      EmployeeStatusId: 1
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Employees', null, {});
  }
};
