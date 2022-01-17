const route = require(`express`).Router();

const { clientLogin, clientRegister } = require('../controllers/clientController')

const { authentication, authorization } = require("../middlewere/auth");
const errorsLog  = require("../middlewere/errorHandler");

//admin & Doctor
// route.post('/cms/login', cmsLogin);


//customer
route.post('/register', clientRegister);
route.post('/login', clientLogin);







route.use(errorsLog);

module.exports = route

