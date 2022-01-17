const route = require(`express`).Router();

const { clientLogin, clientRegister, clientAccount } = require('../controllers/clientController')
const { cmsRegister, cmsLogin } = require('../controllers/cmsController')

const { authentication, authorization, authorizationCMS } = require("../middlewere/auth");
const errorsLog  = require("../middlewere/errorHandler");

//admin & Doctor
route.post('/cms/login', cmsLogin);

route.post('/cms/register',[authentication, authorization, authorizationCMS], cmsRegister);


//customer
route.post('/register', clientRegister);
route.post('/login', clientLogin);

route.get('/account',[authentication, authorization], clientAccount);







route.use(errorsLog);

module.exports = route

