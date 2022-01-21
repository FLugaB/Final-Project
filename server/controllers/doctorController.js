// doctorController control:
// jadwal dokter
// data dockter: spesialisasi, dll

const { Product, Voucher, Schedule } = require("../models")
const url = require('url')

class DoctorController {
  static async getSchedules(req, res, next) {
    try {
      res.status(200).json({
        msg: 'GO TO DOCTOR'
      })
    } catch (error) {
      console.log(error);
    }
  }
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
  static async createTicket(req, res, next) {
    // status, transactionId, doctorId via req.body
    const { status, transactionId, doctorId } = req.body
    if (status !== 'paid') throw { name: "UnpaidTransaction" }
    try {
      const input = {
        voucherToken: req.auth.id, //auth.js line 42
        status: 'paid',
        userId: doctorId, 
        transactionId
      }
      const ticket = await Voucher.create(input)
      if (!ticket) throw { name: 'CreateTicketFailed' }
      res.redirect(url.format({
        pathname:'/doctors/chat',
        query: ticket
      }))
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}

module.exports = {
  DoctorController
}