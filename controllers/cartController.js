const factory = require('./handlerFactory');
const catchAsync = require('express-async-handler');
const AppError = require('../utils/AppError');

const Cart = require('../models').Cart;
const Product = require('../models').Product;

// exports.createCart = factory.createOne(Cart);
exports.createCart = catchAsync(async (req, res, next) =>{

    const isValidProduct = await Product.findOne({
        where: {
            id: req.body.productId,
        }
    })

    if(!isValidProduct){
        res.status(404).json({
            status: 'fail',    
            message: 'Provide valid Product ID!!',
        })
    } else {
        const doc = await Cart.create({
            productId: req.body.productId,
            userId: req.user.id,
            quantity: req.body.quantity,
        });
    
        res.status(201).json({
            status: 'success',
            data: doc,
        })
    }
});

exports.showCart = catchAsync(async (req, res, next) =>{
    const doc = await Cart.findAll({
        where: {
            userId: req.user.id,
        },
        include: 'product',
    });
    if(!doc) return next(
        res.status(400).json({
            status: 'failed',
        })
    )
 
    res.status(200).json({
        status: 'success',
        results: doc.length,
        data: {
            doc,
        }
    })
});

exports.deleteCartItem = catchAsync(async(req, res, next)=> {
    const doc = await Cart.destroy({
        where: {
            productId: req.params.id,
        }
    })
    if(!doc) return next( new AppError('No document found with that ID!!', 404));

    res.status(404).json({
        status: 'success',
        message: 'Item deleted successfully!!',
    })
})

