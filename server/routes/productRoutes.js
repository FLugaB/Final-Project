const route = require('express').Router()
const { authentication, authorization, authorizationCMS } = require("../middlewere/auth");
const ImageKit_API = require('../middlewere/imageKit')
const MulterStorage = require('../middlewere/multer')
const { addProduct, showProduct, showProductById, updateProduct, deleteProduct, addDetail, updateDetail, deleteDetail } = require('../controllers/productController');

// CAN BE ACCESS BY ADMIN OR CUSTOMER SIDE
route.get('/products', [authentication, authorization], showProduct)
route.get('/products/:id', [authentication, authorization], showProductById)

// CAN BE ACCESS ONLY BY ADMIN
// THIS IS CONTAINER OF PRODUCT
route.post('/cms/products', [authentication, authorization, authorizationCMS], MulterStorage, ImageKit_API, addProduct)
route.put('/cms/products/:id', [authentication, authorization, authorizationCMS], updateProduct)
route.delete('/cms/products/:id', [authentication, authorization, authorizationCMS], deleteProduct)

// THIS IS ITEM PRODUCT ITSELF
route.post('/cms/details', [authentication, authorization, authorizationCMS], MulterStorage, ImageKit_API, addDetail)
route.put('/cms/details/:id', [authentication, authorization, authorizationCMS], MulterStorage, ImageKit_API, updateDetail)
route.delete('/cms/details/:id', [authentication, authorization, authorizationCMS], deleteDetail)

module.exports = route