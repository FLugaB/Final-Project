const route = require('express').Router()
const { clientAccount, clientUpdateAccount, clientDoctorFetch, clientDoctorDetail } = require('../controllers/clientController')
const { authentication, authorization } = require("../middlewere/auth");

// CUSTOMER IN GENERAL
route.get('/account',[authentication, authorization], clientAccount);
route.put('/account',[authentication, authorization], clientUpdateAccount);

// DOCTOR
route.get('/doctors', clientDoctorFetch);
route.get('/doctors/:DoctorId', clientDoctorDetail);

module.exports = route