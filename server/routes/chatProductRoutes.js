const route = require('express').Router()
const { User, Product, Voucher, Schedule } = require("../models")
const { Op } = require("sequelize");
const { authentication, authorization } = require("../middlewere/auth");
const { TransactionController } = require(`../controllers/transactionController`)
const {voucherUsed, voucherCompleted, voucherUsedByToken} = require ("../controllers/chatProductControlleer")
// create orderPorduct untuk khusus Product Chat
route.post('/products/chat',[authentication, authorization], TransactionController.ticketConsultation);

// ini jalur dokter saat client kelar nge-patch dokter yang dia mau, apabila dia klik dokter tersebut dokter akan get table voucher
route.get('/account/voucherUsed',[authentication, authorization], voucherUsed);

route.get('/account/voucherCompleted',[authentication, authorization], voucherCompleted)

// ini jalur dokter saat client kelar nge-patch dokter yang dia mau, apabila dia klik dokter tersebut dokter akan get table voucher
route.patch('/account/voucherUsed/:id',[authentication, authorization], voucherUsedByToken)
// route khusus untuk chat, pakai server socket
// route.get('/doctors-chat', getSchedules);

module.exports = route