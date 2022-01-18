const route = require(`express`).Router();

const { clientLogin, clientRegister, clientAccount, clientUpdateAccount } = require('../controllers/clientController')
const { cmsRegister, cmsLogin } = require('../controllers/cmsController');
const { addProduct, showProduct, showProductById, updateProduct, deleteProduct } = require('../controllers/productController');

const { requestSnapToken } = require('../apis/midtransController')
const { authentication, authorization, authorizationCMS } = require("../middlewere/auth");
const errorsLog  = require("../middlewere/errorHandler");

//admin & Doctor
route.post('/cms/login', cmsLogin);

route.post('/cms/register',[authentication, authorization, authorizationCMS], cmsRegister);


//customer
route.post('/register', clientRegister);
route.post('/login', clientLogin);

route.get('/account',[authentication, authorization], clientAccount);
route.put('/account',[authentication, authorization], clientUpdateAccount);

//product

route.get('/products', [authentication, authorization], showProduct)
route.get('/products/:id', [authentication, authorization], showProductById)
route.post('/products', [authentication, authorization], addProduct)
route.put('/products/:id', [authentication, authorization], updateProduct)
route.delete('/products/:id', [authentication, authorization], deleteProduct)

route.post('/cart/payment',[ authentication, authorization], requestSnapToken);







route.use(errorsLog);

module.exports = route

