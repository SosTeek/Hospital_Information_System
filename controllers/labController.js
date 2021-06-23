const Lab = require('../models').Lab;

const catchAsync = require('express-async-handler');
const AppError = require('../utils/AppError');


exports.createLab = catchAsync (async (req, res, next)=> {

    const doc = await Lab.create(req.body);
    res.status(201).json({
        status: 'success',
        data: doc,
    })

});

exports.findOneLab = catchAsync (async (req, res, next)=> {
    const doc = await Lab.findOne({
        where: {
            id: req.params.id,
        }
    });
    if(!doc){
        return next(new AppError('No Lab found with that ID!!', 404));
    }
    res.status(200).json({
        status: 'success',
        data: doc,
    });
});

exports.findAllLabs = catchAsync (async (req, res, next) => {
    const doc = await Lab.findAll();

    res.status(200).json({
        status: 'success',
        results: doc.length,
        data: {
            doc,
        }
    });
});

exports.updateLab = catchAsync(async (req, res) => {
    const { id } = req.params;
    const doc = await Lab.update(req.body, {
      where: {
        id: id,
      },
    });
    if (!doc) {
      res.status(404).json({
        status: 'fail',
        message: 'No Lab found with that id!!',
      });
    }
    const updatedLab = await Lab.findOne({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      status: 'success',
      data: {
        data: updatedLab,
      },
    });
  });
  
exports.deleteLab = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Lab.destroy({
      where: {
        id: id,
      },
    });
    if (!doc) {
      return new AppError('There is no any Lab with that ID!!', 404);
    }
  
    res.status(404).json({
      status: 'success',
      message: 'Lab has been deleted successfully.',
    });
})


