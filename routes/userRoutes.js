const express = require('express');
// const multer = require('multer');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// const upload = multer({ dest: 'public/img/users' });

const router = express.Router();

router.get('/', (req, res) =>{
  res.status(200).render('Yoga Studio')
})

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.patch('/reset-password/:token', authController.resetPassword);

// protect all routes after this middleware
router.use(authController.protect);

router.patch('/update-my-password', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.patch(
  '/update-me',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.delete('/delete-me', userController.deleteMe);

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
