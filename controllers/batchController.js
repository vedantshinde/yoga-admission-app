const Batch = require('../models/batchModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');

exports.getAllBatches = factory.getAll(Batch);
exports.getBatch = factory.getOne(Batch);
exports.createBatch = factory.createOne(Batch);
exports.updateBatch = factory.updateOne(Batch);
exports.deleteBatch = factory.deleteOne(Batch);

exports.createUserBatch = catchAsync(async (req, res) => {

    const newDoc = await Batch.create({
        user: req.user.id,
        ...req.body
    });

    res.status(201).json({
      status: 'success',
      data: {
        data: newDoc,
      },
    });
  })