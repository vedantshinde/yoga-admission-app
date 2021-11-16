const express = require('express');
const authController = require('./../controllers/authController');
const batchController = require('./../controllers/batchController');

const router = express.Router();

// protect all routes after this middleware
router.use(authController.protect);

router.post('/update-user-batch', batchController.createUserBatch);
router.post('/', batchController.createBatch);

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(batchController.getAllBatches)

router.route('/:id')
  .get(batchController.getBatch)
  .patch(batchController.updateBatch)
  .delete(batchController.deleteBatch);


module.exports = router;
