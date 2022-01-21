const route = require('express').Router()
const { authentication, authorization } = require("../middlewere/auth");
const { clientAccount, clientUpdateAccount, clientDoctorFetch, clientDoctorDetail } = require('../controllers/clientController')

// CUSTOMER IN GENERAL
route.get('/account',[authentication, authorization], clientAccount);
route.put('/account',[authentication, authorization], clientUpdateAccount);

// DOCTOR
route.get('/doctors', clientDoctorFetch);

route.get('/doctors/:DoctorId', clientDoctorDetail);
// route khusus untuk chat, pakai server socket
// route.get('/doctors-chat', DoctorController.getSchedules);
module.exports = route