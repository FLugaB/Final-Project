const { User, Product, Voucher, Schedule } = require("../models")
const { Op } = require("sequelize");

module.exports = class Controller {

  static  voucherUsed = async (req, res, next) => {
    try {

        const findAllTicket = await Voucher.findAll({
            where: {
                [Op.and]: [
                    { DoctorId: req.auth.id }, 
                    { status: `used` }
                ], 
            },
        })

        if (findAllTicket.length < 1 ) {
            const text = "There is No Ticket yet.."
            res.status(200).json({text})
        } else {
            res.status(200).json(findAllTicket)
        }

    } catch (error) {
        next(error)
    }
  }

  static voucherCompleted =  async (req, res, next) => {
    try {
        const findAllTicket = await Voucher.findAll({
            where: {
                [Op.and]: [
                    { DoctorId: req.auth.id }, 
                    { status: `completed` }
                ], 
            },
        })

        if (findAllTicket.length < 1 ) {
            const text = "There is No Ticket yet.."
            
            res.status(200).json({text})
        } else {
            
            res.status(200).json(findAllTicket)
        }
    } catch (error) {
        next(error)
    }
  }

  static voucherUsedByToken = async (req, res, next) => {
    
    try {

        // Nanti Setelah Client Ke tendang atau di kick oleh dokter atau waktu consul habis maka di patch status voucher tersebut menajadi Completed

        const { id } = req.params

        const findAllTicket = await Voucher.findOne({
            where: {id }
        })

        
            const updateTicket = await Voucher.update(
            {
                status: 'completed'
            },
            {
                where: {id},
                returning: true
            })
            console.log("masuk else");
            res.status(200).json(updateTicket)
        


        
    } catch (error) {
        next(error)
    }
  }
}