const route = require('express').Router()
const { authentication, authorization } = require("../middlewere/auth");
const { addClientCart, deleteClientCart } = require('../controllers/clientCart');

// create|delete orderPorduct untuk Product Skincare
route.post('/account/client-cart/:id', [authentication,authorization], addClientCart)
route.delete('/account/client-cart/:id', [authentication, authorization], deleteClientCart )

module.exports = route