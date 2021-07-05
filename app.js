var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const moment = require('moment');

const  dotenv = require('dotenv');

// const datetime = moment(new Date()).format('dddd, MMMM Do YYYY, h:mm:ss a');
// console.log(datetime);
dotenv.config({path: './config.env'});


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userRoutes');
const hospitalsRouter = require('./routes/hospitalRoutes');
const doctorsRouter = require('./routes/doctorRoutes');
const ambulanceRouter = require('./routes/ambulanceRoutes');
const labRouter = require('./routes/labRoutes');
const bloodBankRouter = require('./routes/bloodBankRoutes');
const bloodDetailRouter = require('./routes/bloodDetailRoutes');
const doctorCategoryRouter = require('./routes/doctorCategoryRoutes');
const officeRouter = require('./routes/officeRoutes');
const productRouter = require('./routes/productRoutes');
const productCategoryRouter = require('./routes/productCategoryRoutes');
const cartRouter = require('./routes/cartRoutes');
const favouriteRouter = require('./routes/favouriteRoutes');
const orderRouter = require('./routes/orderRoutes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/user', usersRouter);
app.use('/api/hospital', hospitalsRouter);
app.use('/api/doctor', doctorsRouter);
app.use('/api/ambulance', ambulanceRouter);
app.use('/api/lab', labRouter);
app.use('/api/bloodbank', bloodBankRouter);
app.use('/api/blooddetail', bloodDetailRouter);
app.use('/api/doctorcategory', doctorCategoryRouter);
app.use('/api/office', officeRouter);
app.use('/api/product', productRouter);
app.use('/api/productcategory', productCategoryRouter);
app.use('/api/cart', cartRouter);
app.use('/api/favourite', favouriteRouter);
app.use('/api/order', orderRouter);

module.exports = app;
