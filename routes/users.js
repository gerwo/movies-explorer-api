const router = require('express').Router();

const { userUpdateValidation } = require('../middlewares/celebrate');

const {
  getCurrentUser,
  updateUserProfile,
} = require('../controllers/users');

router.get('/me', getCurrentUser);
router.patch('/me', userUpdateValidation, updateUserProfile);

module.exports = router;
