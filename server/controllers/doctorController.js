// doctorController control:
// jadwal dokter
// data dockter: spesialisasi, dll

const {Product, DetailProduct, User, Profile} = require("../models")

class DoctorController {
  static async addSchedule(req, res, next) {
    try {
      const {title, type} = req.body
      const input = {title, type}
      const result = await Product.create(input)
      res.status(201).json(result)
    } catch (err) {
      console.log(err);
      next (err)
    }
  }
  static async editSchedule(req, res, next) {

  }
  static async deleteSchedule(req, res, next) {

  }
  static async add(req, res, next) {

  }
  static async addSchedule(req, res, next) {

  }
  static async addSchedule(req, res, next) {

  }
}

module.exports = {
  DoctorController
}