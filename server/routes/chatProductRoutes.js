const route = require('express').Router()
const { User, Product, Voucher, Schedule } = require("../models")
const { Op } = require("sequelize");
const { authentication, authorization } = require("../middlewere/auth");
const { TransactionController } = require(`../controllers/transactionController`)
const { DoctorController } = require(`../controllers/doctorController`)
const { clientDoctorDetail } = require('../controllers/clientController')

// create orderPorduct untuk khusus Product Chat
route.post('/products/chat',[authentication, authorization], TransactionController.ticketConsultation);

// ini jalur dokter saat client kelar nge-patch dokter yang dia mau, apabila dia klik dokter tersebut dokter akan get table voucher
route.get('/account/voucherUsed',[authentication, authorization], async (req, res, next) => {
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
});

route.get('/account/voucherCompleted',[authentication, authorization], async (req, res, next) => {
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
});

// ini jalur dokter saat client kelar nge-patch dokter yang dia mau, apabila dia klik dokter tersebut dokter akan get table voucher
route.patch('/account/voucherUsed/:token',[authentication, authorization], async (req, res, next) => {
    
    try {

        // Nanti Setelah Client Ke tendang atau di kick oleh dokter atau waktu consul habis maka di patch status voucher tersebut menajadi Completed
        
    } catch (error) {
        next(error)
    }
});
// route khusus untuk chat, pakai server socket
// route.get('/doctors-chat', DoctorController.getSchedules);

module.exports = route