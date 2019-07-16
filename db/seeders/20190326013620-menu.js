'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Menus', [
      {
          "id": 4,
          "link": "/solicitations",
          "name": "Solicitações",
          "icon": "mdi mdi-chevron-right",
          "createdAt": new Date(),
          "updatedAt": new Date(),
          "MenuId": 2
      },
      {
          "id": 5,
          "link": "/registers",
          "name": "Cadastros",
          "icon": "mdi mdi-chevron-right",
          "createdAt": new Date(),
          "updatedAt": new Date(),
          "MenuId": 2
      },
      {
          "id": 6,
          "link": "/",
          "name": "Documentos",
          "icon": "mdi mdi-chevron-right",
          "createdAt": new Date(),
          "updatedAt": new Date(),
          "MenuId": 2
      },
      {
          "id": 7,
          "link": "/permissions",
          "name": "Permissões",
          "icon": "mdi mdi-chevron-right",
          "createdAt": new Date(),
          "updatedAt": new Date(),
          "MenuId": 6
      },
      {
          "id": 9,
          "link": "/reports",
          "name": "Relatórios",
          "icon": "mdi mdi-chevron-right",
          "createdAt": new Date(),
          "updatedAt": new Date()
      },
      {
          "id": 10,
          "link": "/integrations-manger",
          "name": "Integrações",
          "icon": "mdi mdi-chevron-right",
          "createdAt": new Date(),
          "updatedAt": new Date()
      },
      {
          "id": 11,
          "link": "/audits",
          "name": "Auditoria",
          "icon": "mdi mdi-chevron-right",
          "createdAt": new Date(),
          "updatedAt": new Date()
      },
      {
          "id": 12,
          "link": "/",
          "name": "Configurações",
          "icon": "mdi mdi-chevron-right",
          "createdAt": new Date(),
          "updatedAt": new Date()
      },
      {
          "id": 13,
          "link": "/documents",
          "name": "Documentos",
          "icon": "mdi mdi-chevron-right",
          "createdAt": new Date(),
          "updatedAt": new Date(),
          "MenuId": 12
      },
      {
          "id": 14,
          "link": "/documents-types",
          "name": "Tipos de Documentos",
          "icon": "mdi mdi-chevron-right",
          "createdAt": new Date(),
          "updatedAt": new Date(),
          "MenuId": 12
      },
      {
          "id": 16,
          "link": "/sectors",
          "name": "Setores",
          "icon": "mdi mdi-chevron-right",
          "createdAt": new Date(),
          "updatedAt": new Date(),
          "MenuId": 12
      },
      {
          "id": 17,
          "link": "/functions",
          "name": "Funções",
          "icon": "mdi mdi-chevron-right",
          "createdAt": new Date(),
          "updatedAt": new Date(),
          "MenuId": 12
      },
      {
          "id": 18,
          "link": "/documents-company",
          "name": "Documentos Cadastrais",
          "icon": "mdi mdi-chevron-right",
          "createdAt": new Date(),
          "updatedAt": new Date()
      },
      {
          "id": 19,
          "link": "/documents-periodic",
          "name": "Documentos Mensais",
          "icon": "mdi mdi-chevron-right",
          "createdAt": new Date(),
          "updatedAt": new Date()
      },
      {
          "id": 20,
          "link": "/employees",
          "name": "Funcionários",
          "icon": "mdi mdi-chevron-right",
          "createdAt": new Date(),
          "updatedAt": new Date()
      },
      {
          "id": 21,
          "link": "/contacts",
          "name": "Contatos",
          "icon": "mdi mdi-chevron-right",
          "createdAt": new Date(),
          "updatedAt": new Date()
      },
      {
          "id": 8,
          "link": "/configurations",
          "name": "Configurações",
          "icon": "mdi mdi-chevron-right",
          "createdAt": new Date(),
          "updatedAt": new Date(),
          "MenuId": 6
      },
      {
          "id": 15,
          "link": "/companies-types",
          "name": "Tipos de Empresas",
          "icon": "mdi mdi-chevron-right",
          "createdAt": new Date(),
          "updatedAt": new Date(),
          "MenuId": 12
      },
      {
        "id": 22,
        "link": "/instructors",
        "name": "Instrutores",
        "icon": "mdi mdi-chevron-right",
        "createdAt": new Date(),
        "updatedAt": new Date(),
        "MenuId": 12
    },
      {
          "id": 2,
          "link": "/",
          "name": "Credenciamento",
          "icon": "mdi mdi-chevron-right",
          "createdAt": new Date(),
          "updatedAt": new Date()
      },
      {
        "id": 23,
        "link": "/users",
        "name": "Usuários",
        "icon": "mdi mdi-chevron-right",
        "createdAt": new Date(),
        "updatedAt": new Date()
    }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Menus', null, {});
  }
};
