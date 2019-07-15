'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      id: 1,
      name: 'Jonathan',
      userName: 'jonathan',
      email: 'velosojonathan5@gmail.com',
      phone: '37999223568',
      phone2: '31989915622',
      password: 'e10adc3949ba59abbe56e057f20f883e',
      UserTypeId: 1,
      UserStatusId: 1,
      SectorId: 1,
      CompanyId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: 1,
      name: 'Cleyton',
      userName: 'cleyton',
      email: 'cleytonb40@gmail.com',
      phone: '37999223568',
      phone2: '31989915622',
      password: 'e10adc3949ba59abbe56e057f20f883e',
      UserTypeId: 1,
      UserStatusId: 1,
      SectorId: 1,
      CompanyId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      name: 'Zyad',
      userName: 'zyad',
      email: 'zyad@weecode.com.br',
      phone: '37999223568',
      phone2: '31989915622',
      password: 'e10adc3949ba59abbe56e057f20f883e',
      UserTypeId: 1,
      UserStatusId: 1,
      SectorId: 1,
      CompanyId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: 2,
      name: 'Natalie',
      userName: 'natalie',
      email: 'natalie@weecode.com.br',
      phone: '37999223568',
      phone2: '31989915622',
      password: 'e10adc3949ba59abbe56e057f20f883e',
      UserTypeId: 1,
      UserStatusId: 1,
      SectorId: 1,
      CompanyId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
