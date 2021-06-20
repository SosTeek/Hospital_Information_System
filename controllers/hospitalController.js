const catchAsync = require('express-async-handler');
const Hospital = require('../models').Hospital;
const Doctor = require('../models').Doctor;
const Timing = require('../models').Timing;
const Ambulance = require('../models').Ambulance;

const AppError = require('../utils/AppError');

exports.createHospital = catchAsync( async (req, res, next) => {

  const isDuplicateName = await Hospital.findOne({
    where: {
      hospitalName: req.body.hospitalName,
    }
  })
  if(isDuplicateName){
    res.status(400).json({
      status: 'failed',
      message: 'Hospital with this name already exists!!'
  })
  } else{

      const doc = await Hospital.create(req.body);
      console.log(doc);
      res.status(201).json({
          status: 'success',
          data: doc
          })
    }

})

exports.findOneHospital = catchAsync(async (req, res, next) => {
    const doc =  await Hospital.findOne({
        where: {
            id: req.params.id,
        },
        // include: 'doctors',
        include: 'ambulances',
        include: [ {
          model: Ambulance,
          as: 'ambulances',
          attributes: ['driverName', 'ambulanceNumber']
        },
          {
            model: Doctor,
            as: 'doctors',
            attributes: ['id', 'doctorName', ],
            through: {
              model: Timing,
              as: 'timings',
              attributes: ['from', 'to'],
            }
          }
        ]
    })
    if(!doc){
        return next( new AppError('No hospital found with that ID!!', 404))
    }
    res.status(200).json({
        status: 'status',
        Hospital: {
          doc
        },
    })
})


exports.findAllHospital = catchAsync(async (req, res, next) => {
    const doc =  await Hospital.findAll();

    res.status(200).json({
        status: 'status',
        results: doc.length,
        data: {
            doc,
        },
    })
});

exports.updateHospital = catchAsync(async (req, res) => {
    const { id } = req.params;
    const doc = await Hospital.update(req.body, {
      where: {
        id: id,
      },
    });
    if (!doc) {
      res.status(404).json({
        status: 'fail',
        message: 'No Hospital found with that id!!',
      });
    }
    const updatedHospital = await Hospital.findOne({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      status: 'success',
      data: {
        data: updatedHospital,
      },
    });
  });
  
exports.deleteHospital = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Hospital.destroy({
      where: {
        id: id,
      },
    });
    if (!doc) {
      return new AppError('There is no any Hospital with that ID!!', 404);
    }
  
    res.status(404).json({
      status: 'success',
      message: 'Hospital has been deleted successfully.',
    });
})
