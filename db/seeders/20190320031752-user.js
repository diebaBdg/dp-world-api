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
    },
    {
      id: 2,
      name: 'Zyad',
      userName: 'zyad',
      email: 'zyad@weecode.com.br',
      phone: '37999223568',
      phone2: '31989915622',
      password: '827ccb0eea8a706c4c34a16891f84e7b',
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
