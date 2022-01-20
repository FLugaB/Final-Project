const route = require(`express`).Router();

const { clientLogin, clientRegister, clientAccount, clientUpdateAccount, clientDoctorFetch, clientDoctorDetail } = require('../controllers/clientController')
const { cmsRegister, cmsLogin } = require('../controllers/cmsController');
const { addProduct, showProduct, showProductById, updateProduct, deleteProduct, showDetail, showDetailById, addDetail, updateDetail, deleteDetail } = require('../controllers/productController');
const { TransactionController } = require(`../controllers/transactionController`)

const ImageKit_API = require('../middlewere/imageKit')
const MulterStorage = require('../middlewere/multer')

const { DoctorController } = require('../controllers/doctorController')


const { requestSnapToken, updateStatusTransactions } = require('../apis/midtransController')
const { authentication, authorization, authorizationCMS } = require("../middlewere/auth");
const errorsLog  = require("../middlewere/errorHandler");
const { addClientCart, deleteClientCart } = require('../controllers/clientCart');

//===== ADMIN
route.post('/cms/login', cmsLogin);
route.post('/cms/register',[authentication, authorization, authorizationCMS], cmsRegister);

route.get('/cms/products', [authentication, authorization, authorizationCMS], showProduct)
route.get('/cms/products/:id', [authentication, authorization, authorizationCMS], showProductById)
route.post('/cms/products', [authentication, authorization, authorizationCMS], addProduct)
route.put('/cms/products/:id', [authentication, authorization, authorizationCMS], updateProduct)
route.delete('/cms/products/:id', [authentication, authorization, authorizationCMS], deleteProduct)

route.get('/cms/details/:id', [authentication, authorization, authorizationCMS], showDetailById)

route.post('/cms/details', [authentication, authorization, authorizationCMS], MulterStorage, ImageKit_API, addDetail)

route.put('/cms/details/:id', [authentication, authorization, authorizationCMS], updateDetail)
route.delete('/cms/details/:id', [authentication, authorization, authorizationCMS], deleteDetail)


//===== CUSTOMER
route.post('/register', clientRegister);
route.post('/login', clientLogin);
route.get('/doctors', clientDoctorFetch);


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
router.use('/doctors/chat', (req, res, next) => {
  res.send('di route chat konsultasi')
})


route.use(errorsLog);

module.exports = route

