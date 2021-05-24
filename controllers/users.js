const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');

const BadRequestError = require('../errors/bad-request-err');
const ExistingEmailError = require('../errors/existing-email-err');

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Email и пароль не должны быть пустыми');
  }

  User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new BadRequestError('Неправильные почта или пароль');
      }

      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
        { expiresIn: '7d' },
      );

      return res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: true,
        maxAge: (360000 * 24 * 7),
      })
        .send({ message: 'Вы авторизовались!' });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Email и пароль не должны быть пустыми');
  }
  User.findOne({ email })
    .then((existedUser) => {
      if (existedUser) {
        throw new ExistingEmailError('Пользователь с таким email уже существует');
      }

      bcrypt.hash(password, 10)
        .then((hash) => User.create({
          name,
          email,
          password: hash,
        }))
        .then((createdUser) => {
          if (!createdUser) {
            throw new BadRequestError('Переданы некорректные данные');
          }

          User.findOne({ email })
            .then((user) => res.send(user));
        });
    })
    .catch(next);
};

const signout = (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  }).send({ message: 'Успешный выход' });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const updateUserProfile = (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = { ...req.body };

  User.findByIdAndUpdate(
    userId,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new BadRequestError('Переданы некорректные данные');
      }

      res.send(user);
    })
    .catch(next);
};

module.exports = {
  login,
  createUser,
  signout,
  getCurrentUser,
  updateUserProfile,
};
