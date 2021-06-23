var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const  dotenv = require('dotenv');

dotenv.config({path: './config.env'});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userRoutes');
const hospitalsRouter = require('./routes/hospitalRoutes');
const doctorsRouter = require('./routes/doctorRoutes');
const ambulanceRouter = require('./routes/ambulanceRoutes');
const labRouter = require('./routes/labRoutes');
const bloodBankRouter = require('./routes/bloodBankRoutes');
const bloodDetailRouter = require('./routes/bloodDetailRoutes');

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

module.exports = app;
