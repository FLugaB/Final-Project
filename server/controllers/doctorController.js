// doctorController control:
// jadwal dokter
// data dockter: spesialisasi, dll

const { Product, Voucher, Schedule } = require("../models")
const url = require('url')

class DoctorController {
  static async getSchedules(req, res, next) {
    // ngambil schedule berdasarkan hari dan tag (type service)
    // tag kirim dari req.body bisa arr atau obj
    const { day, tag } = req.body
    try {
      const schedules = await Schedule.findAll({
        include: [
          {
            model: User,
            attributes: {
              exclude: ['password']
            }
          },
          {
            model: Tag
          }
        ]
      })
      res.status(200).json(schedules)
    } catch (err) {
      console.log(err)
      next (err)
    }
  }
  static async addSchedule(req, res, next) {
    
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