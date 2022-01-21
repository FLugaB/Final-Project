const route = require(`express`).Router();
const clientRoutes = require('./clientRoutes')
const productRoutes = require('./productRoutes')
const administrationRoutes = require('./administrationRoutes')
const transactionRoutes = require('./transactionRoutes')
const chatProductRoutes = require('./chatProductRoutes')
const skincareProductRoutes = require('./skincareProductRoutes')


const errorsLog  = require("../middlewere/errorHandler");
const { addClientCart, deleteClientCart } = require('../controllers/clientCart');
const videoDaily = require('../controllers/videoDaily.js');
const videoDailyOwner = require('../controllers/videoDailyOwner');

// ADMINISTRATION ROUTE
route.use('/', administrationRoutes)

// CLIENT ROUTE
route.use('/', clientRoutes)

// TRANSACTION 
route.use('/', transactionRoutes)

// PRODUCT ROUTE
route.use('/', productRoutes)

// CHAT PRODUCT 
route.use('/', chatProductRoutes)

// SKINCARE PRODUCT 
route.use('/', skincareProductRoutes)

<<<<<<< HEAD
//===== CUSTOMER
route.post('/register', clientRegister);
route.post('/login', clientLogin);
route.get('/doctors', clientDoctorFetch);

route.post('/notification/handling', TransactionController.notificationTransaction);


route.get('/account',[authentication, authorization], clientAccount);
route.put('/account',[authentication, authorization], clientUpdateAccount);




route.post('/products/chat',[authentication, authorization], TransactionController.ticketConsultation);

route.post('/account/client-cart/:id', [authentication,authorization], addClientCart)
route.delete('/account/client-cart/:id', [authentication, authorization], deleteClientCart )


route.get('/account/tickets',[authentication, authorization], TransactionController.clientTickets);
route.get('/account/cart',[authentication, authorization], TransactionController.clientCart);


route.get('/account/detail-checkout',[authentication, authorization], TransactionController.clientDetailCheckout);
route.post('/account/payment',[ authentication, authorization, TransactionController.checkoutMid], requestSnapToken);
route.get('/account/status-transactions', [authentication, authorization], TransactionController.fetchStatusTransactions)



route.get('/doctors/:DoctorId', clientDoctorDetail);
route.patch('/account/status-transactions/:orderId', [authentication, authorization], updateStatusTransactions)

// route khusus untuk char, pakai server socket
route.use('/doctors/chat', (req, res, next) => {
  res.send('di route chat konsultasi')
})

// route chat Daily.co
route.get("/video-call/:id", videoDaily)
route.get("/video-call-owner/:id", videoDailyOwner)
=======
>>>>>>> ac98fd7016b9e1a2e6af0c24c4592ea98a2223de
// route ke DoctorController
// route.use('/schedules', DoctorController.getSchedules)


route.use(errorsLog);
module.exports = route