const route = require('express').Router()
const { authentication, authorization, authorizationCMS } = require("../middlewere/auth");
const { cmsRegister, cmsLogin } = require('../controllers/cmsController');
const { clientLogin, clientRegister } = require('../controllers/clientController');
const UploadHandler = require('../middlewere/multer');
const UploadImage = require("../middlewere/imageKit")

// CMS ADMIN ACCESS
route.post("/cms/login", cmsLogin);
route.post(
  "/cms/register",
  [authentication, authorization, authorizationCMS],
  cmsRegister
);

// CUSTOMER AND DOCTOR ACCESS
route.post("/register", UploadHandler, UploadImage, clientRegister);
route.post("/login", clientLogin);

module.exports = route;
