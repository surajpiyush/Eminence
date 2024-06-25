const express=require('express')
const orderRouter = require('./routes/order.route')
const authRouter = require('./routes/auth.route')
const productRouter = require('./routes/product.route')
const path = require('path');

const connectDB = require('./config/db')
require('dotenv').config()
connectDB()
const app = express();
app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth/',authRouter)
app.use('/api/product/',productRouter)
app.use('/api/order/',orderRouter)


const port = process.env.PORT || 4000;
app.listen(port,()=>console.log('Server is runnin on port',port))