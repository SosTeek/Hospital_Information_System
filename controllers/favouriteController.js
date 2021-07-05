const catchAsync = require('express-async-handler');
const AppError = require('../utils/AppError');

const Favourite = require('../models').Favourite;
const Product = require('../models').Product;

exports.createFavourite = catchAsync(async (req, res, next) =>{

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
        const doc = await Favourite.create({
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

exports.showFavouriteProducts = catchAsync(async (req, res, next) =>{
    const doc = await Favourite.findAll({
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


exports.removeFavouriteProduct = catchAsync(async(req, res, next)=> {
    const doc = await Favourite.destroy({
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
