const route = require(`express`).Router();

const { clientLogin, clientRegister, clientAccount, clientUpdateAccount } = require('../controllers/clientController')
const { cmsRegister, cmsLogin } = require('../controllers/cmsController');
const { addProduct, showProduct, showProductById, updateProduct, deleteProduct, showDetail, showDetailById, addDetail, updateDetail, deleteDetail } = require('../controllers/productController');
const { TransactionController } = require(`../controllers/transactionController`)


const { requestSnapToken } = require('../apis/midtransController')
const { authentication, authorization, authorizationCMS } = require("../middlewere/auth");
const errorsLog  = require("../middlewere/errorHandler");

//===== ADMIN
route.post('/cms/login', cmsLogin);
route.post('/cms/register',[authentication, authorization, authorizationCMS], cmsRegister);

route.get('/cms/products', [authentication, authorization, authorizationCMS], showProduct)
route.get('/cms/products/:id', [authentication, authorization, authorizationCMS], showProductById)
route.post('/cms/products', [authentication, authorization, authorizationCMS], addProduct)
route.put('/cms/products/:id', [authentication, authorization, authorizationCMS], updateProduct)
route.delete('/cms/products/:id', [authentication, authorization, authorizationCMS], deleteProduct)

route.get('/cms/details', [authentication, authorization, authorizationCMS], showDetail)
route.get('/cms/details/:id', [authentication, authorization, authorizationCMS], showDetailById)
route.post('/cms/details', [authentication, authorization, authorizationCMS], addDetail)
route.put('/cms/details/:id', [authentication, authorization, authorizationCMS], updateDetail)
route.delete('/cms/details/:id', [authentication, authorization, authorizationCMS], deleteDetail)


//===== CUSTOMER
route.post('/register', clientRegister);
route.post('/login', clientLogin);

route.get('/account',[authentication, authorization], clientAccount);
route.put('/account',[authentication, authorization], clientUpdateAccount);



route.post('/products/chat',[authentication, authorization], TransactionController.ticketConsultation);





route.get('/account/cart',[authentication, authorization], TransactionController.clientCart);
route.get('/account/detail-checkout',[authentication, authorization], TransactionController.clientDetailCheckout);
route.post('/account/payment',[ authentication, authorization, TransactionController.checkoutMid], requestSnapToken);









route.use(errorsLog);

module.exports = route

