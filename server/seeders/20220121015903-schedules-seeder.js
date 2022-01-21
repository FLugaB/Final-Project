'use strict'
const fs = require(`fs`)
module.exports = {
  async up (queryInterface, Sequelize) {
    const schedules = JSON.parse(fs.readFileSync(`./dummyData/doctor/schedules.json`, `utf8`))
    schedules.forEach(element => {
      element.createdAt = new Date()
      element.updatedAt = new Date()
    })
     await queryInterface.bulkInsert('Schedules', schedules)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Schedules', null, {})
  }
}
