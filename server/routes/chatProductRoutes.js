const route = require('express').Router()
const { authentication, authorization } = require("../middlewere/auth");
const { TransactionController } = require(`../controllers/transactionController`)
const { DoctorController } = require(`../controllers/doctorController`)
const { clientDoctorDetail } = require('../controllers/clientController')
const videoDaily = require('../controllers/videoDaily.js');

// create orderPorduct untuk khusus Product Chat
route.post('/products/chat',[authentication, authorization], TransactionController.ticketConsultation);

// route chat Daily.co
route.get("/video-call/:id", videoDaily)

// route khusus untuk chat, pakai server socket
// route.get('/doctors-chat', DoctorController.getSchedules);

module.exports = route