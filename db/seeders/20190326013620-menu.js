'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Menus', [{
      id: 1,
      link: '/accreditation', 
      name: 'Credenciamento', 
      icon: 'fa fa-user-o',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      link: '/requests', 
      name: 'Solicitacoes', 
      icon:'mdi mdi-chevron-right', 
      MenuId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: 3,
      link: '/register', 
      name: 'Cadastros', 
      icon:'mdi mdi-chevron-right', 
      MenuId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 4,
      link: '/', 
      name: 'Documentos', 
      icon:'mdi mdi-chevron-right',
      MenuId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: 5,
      link: '/permission', 
      name: 'Permissões', 
      icon:'mdi mdi-chevron-right',
      MenuId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: 6,
      link: '/configuration', 
      name: 'Configurações', 
      icon:'mdi mdi-chevron-right',
      MenuId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: 7,
      link: '/tpo-empresa', 
      name: 'Relatórios', 
      icon:'fa fa-files-o',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: 8,
      link: '/empresa', 
      name: 'Integrações', 
      icon:'fa fa-gears',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 9,
      link: '/empresa', 
      name: 'Auditoria', 
      icon:'fa fa-file-text-o',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Menus', null, {});
  }
};
