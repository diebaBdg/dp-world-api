'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('CompanyAttachments', [{
      originalName: "empty.csv",
      fileName: "attachment-1554956328223.csv",
      validityDate: null,
      encoding: "7bit",
      mimetype: "text/csv",
      destination: "./uploads/companies/1",
      size: "9295856",
      path: "uploads\\companies\\1\\attachment-1554956328223.csv",
      note: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      AttachmentStatusId: 1,
      CompanyId: 1,
      DocumentId: 3
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('CompanyAttachments', null, {});
  }
};
