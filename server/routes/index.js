const route = require(`express`).Router();
const clientRoutes = require('./clientRoutes')
const productRoutes = require('./productRoutes')
const administrationRoutes = require('./administrationRoutes')
const transactionRoutes = require('./transactionRoutes')
const chatProductRoutes = require('./chatProductRoutes')
const skincareProductRoutes = require('./skincareProductRoutes')
const videoDaily = require('../controllers/videoDaily.js');
const videoDailyOwner = require('../controllers/videoDailyOwner');

const errorsLog  = require("../middlewere/errorHandler");

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

// route chat Daily.co
route.get("/video-call/:id", videoDaily)
route.get("/video-call-owner/:id", videoDailyOwner)
// route ke DoctorController
// route.use('/schedules', DoctorController.getSchedules)


route.use(errorsLog);
module.exports = route