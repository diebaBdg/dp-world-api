'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Companies', [{
      id: 1,
      cnpj: '16362700001089',
      socialName: "Empresa Teste",
      businessName: "Empresa Teste",
      address: "Av Afonso Pena 3148",
      number: "1",
      complement: "apto 101",
      district: "Funcionários",
      city: "Belo Horizonte",
      state: "MG",
      country: "Brazil",
      cep: "30130012",
      phone: "31989915622",
      inscricaoEstadual: "12354885",
      site: "http://www.semsite.com.br",
      createdAt: new Date(),
      updatedAt: new Date(),
      CompanyId: null,
      CompanyTypeId: 1,
      CompanyStatusId: 1,
      SectorId: 1
    }, {
      id: 2,
      cnpj: '32325649000179',
      socialName: "Empresa Teste 2",
      businessName: "Empresa Teste 2",
      address: "Av Afonso Pena 3148",
      number: "1",
      complement: "apto 101",
      district: "Funcionários",
      city: "Belo Horizonte",
      state: "MG",
      country: "Brazil",
      cep: "30130012",
      phone: "31989915622",
      inscricaoEstadual: "12354885",
      site: "http://www.semsite.com.br",
      createdAt: new Date(),
      updatedAt: new Date(),
      CompanyId: 1,
      CompanyTypeId: 1,
      CompanyStatusId: 1,
      SectorId: null
    },], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Companies', null, {});
  }
};
