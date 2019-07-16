'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('MenuToUserTypes', [{
      createdAt: new Date(),
      updatedAt: new Date(),
      "MenuId": "2",
      "UserTypeId": "1"
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      "MenuId": "4",
      "UserTypeId": "1"
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      "MenuId": "5",
      "UserTypeId": "1"
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      "MenuId": "6",
      "UserTypeId": "1"
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      "MenuId": "7",
      "UserTypeId": "1"
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      "MenuId": "8",
      "UserTypeId": "1"
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      "MenuId": "9",
      "UserTypeId": "1"
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      "MenuId": "10",
      "UserTypeId": "1"
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      "MenuId": "11",
      "UserTypeId": "1"
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      "MenuId": "12",
      "UserTypeId": "1"
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      "MenuId": "13",
      "UserTypeId": "1"
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      "MenuId": "14",
      "UserTypeId": "1"
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      "MenuId": "15",
      "UserTypeId": "1"
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      "MenuId": "16",
      "UserTypeId": "1"
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      "MenuId": "17",
      "UserTypeId": "1"
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      "MenuId": "18",
      "UserTypeId": "2"
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      "MenuId": "19",
      "UserTypeId": "2"
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      "MenuId": "20",
      "UserTypeId": "2"
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      "MenuId": "21",
      "UserTypeId": "2"
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      "MenuId": "22",
      "UserTypeId": "1"
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      "MenuId": "23",
      "UserTypeId": "1"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('MenuToUserTypes', null, {});
  }
};
