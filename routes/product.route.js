const express=require('express')
const upload = require('../middleware/multer')
const { authorize, auth } = require('../middleware/auth')
const { createProduct, updateProduct, getProducts } = require('../controllers/product.controller')
const productRouter=express.Router()

productRouter.post('/createProduct',auth,authorize(['admin']),upload,createProduct)
productRouter.put('/updateProduct/:productId',auth,authorize(['admin']),upload,updateProduct)
productRouter.get('/allProducts',auth,authorize(['admin']),getProducts)


module.exports=productRouter