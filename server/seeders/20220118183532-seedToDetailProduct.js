'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     const data = require("../dummyData/detailProduct.json")
     data.forEach(element => {
       element.createdAt = new Date(),
       element.updatedAt = new Date()
     });
      await queryInterface.bulkInsert('DetailProducts', data, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('DetailProducts', null, {});

  }
};
