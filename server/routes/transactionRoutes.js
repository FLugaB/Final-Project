const route = require('express').Router()
const { authentication, authorization, authorizationCMS } = require("../middlewere/auth")
const { TransactionController } = require(`../controllers/transactionController`)
const { requestSnapToken } = require('../apis/midtransController')



// cek orderPorduct with status completed
//ini embat ticket yang sudah dibeli useable atau used
route.get('/account/tickets',[authentication, authorization], TransactionController.clientTickets);
// ini setelah pilih dokter client ngepatch voucher ticket untuk  dokter id dan voucher token
route.patch('/account/tickets/:DoctorId',[authentication, authorization], TransactionController.clientTicketsDoctors);

// cek orderPorduct with id sesuai yg login show (only orderPorduct)
route.get('/account/cart',[authentication, authorization], TransactionController.clientCart);

// cek orderPorduct with id sesuai yg login then show (CHECKOUT DATA)
// OR Create New Transaction basedOn orderPorduct
route.get('/account/detail-checkout',[authentication, authorization], TransactionController.clientDetailCheckout);

// melakukan pembayaran
route.post('/account/payment',[ authentication, authorization, TransactionController.checkoutMid], requestSnapToken);

// find all semua transaction
route.get('/account/status-transactions', [authentication, authorization], TransactionController.fetchStatusTransactions)

// update status transaction, status berubah ke failed if 20m gk bayar 
// OR update Status OrderProduct
// route.patch('/account/status-transactions/:orderId', [authentication, authorization], updateStatusTransactions)

// trigger by notification
route.post('/notification/handling', TransactionController.notificationTransaction);

module.exports = route