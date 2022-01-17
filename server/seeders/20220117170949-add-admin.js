'use strict';
const fs = require(`fs`)
module.exports = {
  async up (queryInterface, Sequelize) {
     const userAdmin = JSON.parse(fs.readFileSync(`./dummyData/user.json`, `utf8`));
     userAdmin.forEach(element => {
       element.createdAt = new Date(),
       element.updatedAt = new Date()
     });
      await queryInterface.bulkInsert('Users', userAdmin);
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Users', null, {});
  }
};
