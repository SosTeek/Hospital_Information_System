const BloodBank = require('../models').BloodBank;

const catchAsync = require('express-async-handler');
const AppError = require('../utils/AppError');


exports.createBloodBank = catchAsync (async (req, res, next)=> {

    const doc = await BloodBank.create(req.body);
    res.status(201).json({
        status: 'success',
        data: doc,
    })

});

exports.findOneBloodBank = catchAsync (async (req, res, next)=> {
    const doc = await BloodBank.findOne({
        where: {
            id: req.params.id,
        },
        include: 'bloodDetails',
    });
    if(!doc){
        return next(new AppError('No BloodBank found with that ID!!', 404));
    }
    res.status(200).json({
        status: 'success',
        data: doc,
    });
});

exports.findAllBloodBanks = catchAsync (async (req, res, next) => {
    const doc = await BloodBank.findAll();

    res.status(200).json({
        status: 'success',
        results: doc.length,
        data: {
            doc,
        }
    });
});

exports.updateBloodBank = catchAsync(async (req, res) => {
    const { id } = req.params;
    const doc = await BloodBank.update(req.body, {
      where: {
        id: id,
      },
    });
    if (!doc) {
      res.status(404).json({
        status: 'fail',
        message: 'No BloodBank found with that id!!',
      });
    }
    const updatedBloodBank = await BloodBank.findOne({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      status: 'success',
      data: {
        data: updatedBloodBank,
      },
    });
  });
  
exports.deleteBloodBank = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const doc = await BloodBank.destroy({
      where: {
        id: id,
      },
    });
    if (!doc) {
      return new AppError('There is no any BloodBank with that ID!!', 404);
    }
  
    res.status(404).json({
      status: 'success',
      message: 'BloodBank has been deleted successfully.',
    });
})


