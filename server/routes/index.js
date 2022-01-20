const route = require(`express`).Router();
const clientRoutes = require('./clientRoutes')
const productRoutes = require('./productRoutes')
const administrationRoutes = require('./administrationRoutes')

const { TransactionController } = require(`../controllers/transactionController`)
const { addClientCart, deleteClientCart } = require('../controllers/clientCart');
const { requestSnapToken, updateStatusTransactions } = require('../apis/midtransController')

const errorsLog  = require("../middlewere/errorHandler");
const { authentication, authorization, authorizationCMS } = require("../middlewere/auth");

// ADMINISTRATION ROUTE
route.use('/', administrationRoutes)

// PRODUCT ROUTE
route.use('/', productRoutes)

// CLIENT ROUTE
route.use('/', clientRoutes)


// TRANSACTION 
// nambahin product ke cart dan perlu d checkout ( u/ chat)
route.post('/products/chat',[authentication, authorization], TransactionController.ticketConsultation);
route.get('/account/tickets',[authentication, authorization], TransactionController.clientTickets);

// mau nambah / ilangin item di cart disini ( u/ skin care)
route.post('/account/client-cart/:id', [authentication,authorization], addClientCart)
route.delete('/account/client-cart/:id', [authentication, authorization], deleteClientCart )

// =====
route.get('/account/cart',[authentication, authorization], TransactionController.clientCart);
route.get('/account/detail-checkout',[authentication, authorization], TransactionController.clientDetailCheckout);
route.post('/account/payment',[ authentication, authorization, TransactionController.checkoutMid], requestSnapToken);
// =====
route.get('/account/status-transactions', [authentication, authorization], TransactionController.fetchStatusTransactions)
// berubah status failed if 20m gk bayar
route.patch('/account/status-transactions/:orderId', [authentication, authorization], updateStatusTransactions)


// route khusus untuk char, pakai server socket
route.use('/doctors/chat', (req, res, next) => {
  res.send('di route chat konsultasi')
})

route.use(errorsLog);
module.exports = route