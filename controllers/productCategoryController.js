const catchAsync = require('express-async-handler');
const AppError = require('../utils/AppError');
const factory = require('./handlerFactory');

const ProductCategory = require('../models').ProductCategory;

exports.createProductCategory = factory.createOne(ProductCategory);


exports.findAllProductCategory = factory.getAll(ProductCategory);

exports.findOneProductCategory = factory.getOne(ProductCategory, 'products');