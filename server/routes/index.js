const route = require(`express`).Router();

const { clientLogin, clientRegister, clientAccount, clientUpdateAccount } = require('../controllers/clientController')
const { cmsRegister, cmsLogin } = require('../controllers/cmsController');
const { addProduct, showProduct, showProductById, updateProduct, deleteProduct } = require('../controllers/productController');
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


//===== CUSTOMER
route.post('/register', clientRegister);
route.post('/login', clientLogin);

route.get('/account',[authentication, authorization], clientAccount);
route.put('/account',[authentication, authorization], clientUpdateAccount);





route.post('/cart/payment',[ authentication, authorization], requestSnapToken);









route.use(errorsLog);

module.exports = route

