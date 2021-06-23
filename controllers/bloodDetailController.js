const BloodDetail = require('../models').BloodDetail;
const BloodBank = require('../models').BloodBank;

const catchAsync = require('express-async-handler');
const AppError = require('../utils/AppError');



exports.createBloodDetail = catchAsync (async (req, res, next)=> {
    const isValidBloodBank = await BloodBank.findOne({ where:{
        id: req.body.bloodBankId,
    }});
    if(!isValidBloodBank){
        return next(new AppError('Please provide a valid blood bank!!', 404))
    }
    const doc = await BloodDetail.create(req.body);
    res.status(201).json({
        status: 'success',
        data: doc,
    })

});

exports.findOneBloodDetail = catchAsync (async (req, res, next)=> {
    const doc = await BloodDetail.findOne({
        where: {
            id: req.params.id,
        }, 
        include: 'bloodBank'
    });
    if(!doc){
        return next(new AppError('No BloodDetail found with that ID!!', 404));
    }
    res.status(200).json({
        status: 'success',
        data: doc,
    });
});

exports.findAllBloodDetails = catchAsync (async (req, res, next) => {
    const doc = await BloodDetail.findAll();

    res.status(200).json({
        status: 'success',
        results: doc.length,
        data: {
            doc,
        }
    });
});

exports.updateBloodDetail = catchAsync(async (req, res) => {
    const { id } = req.params;
    const doc = await BloodDetail.update(req.body, {
      where: {
        id: id,
      },
    });
    if (!doc) {
      res.status(404).json({
        status: 'fail',
        message: 'No BloodDetail found with that id!!',
      });
    }
    const updatedBloodDetail = await BloodDetail.findOne({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      status: 'success',
      data: {
        data: updatedBloodDetail,
      },
    });
  });
  
exports.deleteBloodDetail = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const doc = await BloodDetail.destroy({
      where: {
        id: id,
      },
    });
    if (!doc) {
      return new AppError('There is no any BloodDetail with that ID!!', 404);
    }
  
    res.status(404).json({
      status: 'success',
      message: 'BloodDetail has been deleted successfully.',
    });
})


