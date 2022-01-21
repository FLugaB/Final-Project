'use strict';
const fs = require(`fs`)
module.exports = {
  async up (queryInterface, Sequelize) {
    const adminProfile = JSON.parse(fs.readFileSync(`./dummyData/profile.json`, `utf8`));
    adminProfile.forEach(element => {
      element.createdAt = new Date()
      element.updatedAt = new Date()
    });
     await queryInterface.bulkInsert('Profiles', adminProfile);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Profiles', null, {});
  }
};
