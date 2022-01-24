'use strict';
const fs = require(`fs`);
const { hashPass } = require("../helpers/bycrpt");
module.exports = {
  async up (queryInterface, Sequelize) {
     const userAdmin = JSON.parse(fs.readFileSync(`./dummyData/user/user.json`, `utf8`));
     userAdmin.forEach(element => {
       element.createdAt = new Date(),
       element.updatedAt = new Date(),
       element.password = hashPass(element.password)
     });
      await queryInterface.bulkInsert('Users', userAdmin);
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Users', null, {});
  }
};
