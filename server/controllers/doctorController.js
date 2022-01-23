// doctorController control:
// jadwal dokter
// data dockter: spesialisasi, dll

const { User, Product, Voucher, Schedule } = require("../models")
const url = require('url')

class DoctorController {
  static async getSchedules(req, res, next) {
    // ngambil schedule berdasarkan hari dan tag (type service)
    // tag kirim dari req.body bisa arr atau obj
    const { day, tag } = req.body
    const options = {}
    if (day) {
      options.day = day
    }
    console.log(options)
    try {
      const schedules = await Schedule.findAll({
        where: options,
        include: [
          {
            model: User,
            attributes: {
              exclude: ['password']
            }
          }
          // {
          //   model: Tag
          // }
        ]
        
      })
      res.status(200).json(schedules)
    } catch (err) {
      console.log(err)
      next (err)
    }
  }
  static async addSchedule(req, res, next) {
    const { day, hour, price, hospital, UserId, ScheduleTagId } = req.body
    try {
      const input = {
        day,
        hour,
        price: +price,
        hospital,
        UserId: +UserId,
        ScheduleTagId: +ScheduleTagId
      }
      const created = await Schedule.create(input)
      res.status(201).json(created)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  static async editSchedule(req, res, next) {
    const { id } = req.params
    const { day, hour, price, hospital, UserId, ScheduleTagId } = req.body
    try {
      const update = {
        day,
        hour,
        price: +price,
        hospital,
        UserId: +UserId,
        ScheduleTagId: +ScheduleTagId
      }
      const updated = await Schedule.update(update, {
        where: { id },
        returning: true
      })
      res.status(200).json(updated[1][0])
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  static async deleteSchedule(req, res, next) {
    const { id } = req.params
    try {
      // check schedule id
      const found = await Schedule.findByPk(id)
      if (!found) throw { name: 'schedule not found' }
      else {
        const deleted = await Schedule.destroy({
          where: { id }
        })
        if (deleted === 1) {
          res.status(200).json({
            message: `Success delete schedule id ${id}`,
            deleted: found
          })
        } else {
          throw { name: 'delete schedule failed' }
        }
      }
    } catch (error) {
      next(error)
    }
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

module.exports = DoctorController