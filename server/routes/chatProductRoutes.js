const route = require('express').Router()
const { authentication, authorization } = require("../middlewere/auth");
const { TransactionController } = require(`../controllers/transactionController`)
const { DoctorController } = require(`../controllers/doctorController`)
const { clientDoctorDetail } = require('../controllers/clientController')

// create orderPorduct untuk khusus Product Chat
route.post('/products/chat',[authentication, authorization], TransactionController.ticketConsultation);


// route khusus untuk chat, pakai server socket
// route.get('/doctors-chat', DoctorController.getSchedules);

module.exports = route