const catchAsync = require('express-async-handler');
const AppError = require('../utils/AppError');
const factory = require('./handlerFactory');

const Ambulance = require('../models').Ambulance;
const Hospital = require('../models').Hospital;

exports.createAmbulance = catchAsync(async(req, res, next)=> {
    const isValidHospital = await Hospital.findOne({
        where: {
            id: req.body.hospitalId,
        }
    });
    if(!isValidHospital){
        res.status(400).json({
            status: 'failed',
            message: 'Please provide a valid Hospital Id!!',
        })
    } else {
        const doc = await Ambulance.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                doc,
            }
        })
    }
});


exports.findOneAmbulance = catchAsync(async (req, res, next) => {
    const doc =  await Ambulance.findOne({
        where: {
            id: req.params.id,
        },
        include: 'hospital',
    })
    if(!doc){
        return next( new AppError('No Ambulance found with that ID!!', 404))
    }
    res.status(200).json({
        status: 'status',
        Ambulance: doc,
    })
})

exports.findAllAmbulance = factory.getAll(Ambulance);
// exports.findAllAmbulance = catchAsync(async (req, res, next) => {
//     const doc =  await Ambulance.findAll();

//     res.status(200).json({
//         status: 'status',
//         results: doc.length,
//         data: {
//             doc,
//         },
//     })
// });

exports.updateAmbulance = factory.updateOne(Ambulance);
// exports.updateAmbulance = catchAsync(async (req, res) => {
//     const { id } = req.params;
//     const doc = await Ambulance.update(req.body, {
//       where: {
//         id: id,
//       },
//     });
//     if (!doc) {
//       res.status(404).json({
//         status: 'fail',
//         message: 'No Ambulance found with that id!!',
//       });
//     }
//     const updatedAmbulance = await Ambulance.findOne({
//       where: {
//         id: id,
//       },
//     });
//     res.status(200).json({
//       status: 'success',
//       data: {
//         data: updatedAmbulance,
//       },
//     });
//   });

  
  exports.deleteAmbulance = factory.deleteOne(Ambulance); 
// exports.deleteAmbulance = catchAsync(async (req, res, next) => {
//     const { id } = req.params;
//     const doc = await Ambulance.destroy({
//       where: {
//         id: id,
//       },
//     });
//     if (!doc) {
//       return new AppError('There is no any Ambulance with that ID!!', 404);
//     }
  
//     res.status(404).json({
//       status: 'success',
//       message: 'Ambulance has been deleted successfully.',
//     });
// })
