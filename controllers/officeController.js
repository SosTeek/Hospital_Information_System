const Office = require('../models').Office;

const catchAsync = require('express-async-handler');

exports.createOffice = catchAsync (async (req, res) => {
    const doc = await Office.create(req.body);

    res.status(201).json({
        status: 'success',
        data: doc,
    })
});

exports.findOneOffice = catchAsync(async (req, res, next) => {
    const doc =  await Office.findOne({
        where: {
            id: req.params.id,
        },
    })
    if(!doc){
        return next( new AppError('No Office found with that ID!!', 404))
    }
    res.status(200).json({
        status: 'status',
        Office: doc,
    })
})


exports.findAllOffice = catchAsync(async (req, res, next) => {
    const doc =  await Office.findAll();

    res.status(200).json({
        status: 'status',
        results: doc.length,
        data: {
            doc,
        },
    })
});


exports.deleteOffice = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Office.destroy({
      where: {
        id: id,
      },
    });
    if (!doc) {
      return new AppError('There is no any Office with that ID!!', 404);
    }
  
    res.status(404).json({
      status: 'success',
      message: 'Office has been deleted successfully.',
    });
})