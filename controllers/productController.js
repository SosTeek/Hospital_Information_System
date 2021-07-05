const catchAsync = require('express-async-handler');
const AppError = require('../utils/AppError');
const factory = require('./handlerFactory');

const Product = require('../models').Product;


exports.createProduct = factory.createOne(Product);

exports.findOneProduct = factory.getOne(Product, 'category');
// exports.findOneProduct = catchAsync(async (req, res, next) => {
//     const doc = await Product.findOne({
//         where: {
//             id: req.params.id,
//         }, 
//         include: 'category',
//     })

//     if(!doc) return next( new AppError('No document found with that ID!!', 404));

//     res.status(200).json({
//         status: 'success',
//         data: doc,
//     })
// });

exports.findAllProducts = factory.getAll(Product);

exports.updateProduct = factory.updateOne(Product);

exports.deleteProduct = factory.deleteOne(Product);