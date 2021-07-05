const catchAsync = require('express-async-handler');
const AppError = require('../utils/AppError');

const PateintDetail = require('../models').PateintDetail;

const factory = require('./handlerFactory');

exports.createAppointment = catchAsync(async (req, res, next) => {
    const PDetail={
        firstName = req.body.firstName,
        lastName = req.body.lastName,
        phone = req.body.phone,
        gender = req.body.gender,
        dateOfBirth = req.body.dateOfBirth,
    };
    const newPatient = await PateintDetail.create(PDetail);
    
})