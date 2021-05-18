const router = require('express').Router();
const auth = require('../middlewares/auth');
const users = require('./users');
const movies = require('./movies');
const { login, createUser, signout } = require('../controllers/users');

const NotFoundError = require('../errors/not-found-err');

const {
  loginValidation,
  createUserValidation,
} = require('../middlewares/celebrate');

router.post('/signin', loginValidation, login);
router.post('/signup', createUserValidation, createUser);

router.use('/users', auth, users);
router.use('/movies', auth, movies);

router.delete('/signout', signout);

router.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
