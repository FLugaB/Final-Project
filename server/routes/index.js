const route = require(`express`).Router();

const { clientLogin, clientRegister } = require('../controllers/clientController')
const { cmsRegister, cmsLogin } = require('../controllers/cmsController')

const { authentication, authorization } = require("../middlewere/auth");
const errorsLog  = require("../middlewere/errorHandler");

//admin & Doctor
route.post('/cms/login', cmsLogin);

route.post('/cms/register',[authentication, authorization], cmsRegister);


//customer
route.post('/register', clientRegister);
route.post('/login', clientLogin);







route.use(errorsLog);

module.exports = route

