const moment = require('moment');
const catchAsync = require('express-async-handler');
const AppError = require('../utils/AppError');

const Order = require('../models').Order;
const Product = require('../models').Product;
const History = require('../models').History;

exports.createOrder = catchAsync (async (req, res, next) => {

    const isValidProduct = await Product.findOne({
        where: {
            id: req.body.productId,
        }
    });

    if(!isValidProduct){
        return next( new AppError('Provide valid product ID!!'));
    } else{
        const totalPrice = isValidProduct.productPrice * (req.body.quantity || 1);

        const doc = await Order.create({
            productId: req.body.productId,
            userId: req.user.id,
            quantity: req.body.quantity,
            total: totalPrice,
        });
        const ACCEPT_FORMAT = 'dddd, MMMM Do YYYY, h:mm:ss a';
        const t = moment( new Date(), ACCEPT_FORMAT);
        // const t = moment(new Date()).format(ACCEPT_FORMAT);
        console.log(t)
        
        const historyDetails = {
            appointmentId: undefined,
            orderId: doc.id,
            userId: req.user.id,
            time: t,
        }
        await History.create(historyDetails);
        res.status(201).json({
            status: 'success',
            data: doc,
        })
    }

});

exports.showOrders = catchAsync(async (req, res, next) => {
    const doc = await Order.findAll({
        where: {
            userId: req.user.id,
        }
    });

    res.status(200).json({
        status: 'success',
        results: doc.length,
        data: {
            doc,
        }
    });

})