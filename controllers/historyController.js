const catchAsync = require('express-async-handler');
const AppError = require('../utils/AppError');

const History = require('../models').History;

exports.showAllHistory = catchAsync(async (req, res, next) => {
    const doc = await History.findAll({
        where: {
            userId: req.user.id,
        }
    })
    res.status(200).json({
        status: 'success',
        results: doc.length,
        data: {
            doc,
        }
    })
})