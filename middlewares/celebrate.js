const { celebrate, Joi } = require('celebrate');

const { pattern } = require('../config');

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi
      .string()
      .required()
      .email()
      .messages({
        'string.email': 'Не валидное поле "email"',
        'string.empty': 'Поле "email" не должно быть пустым',
        'any.required': 'Поле "email" не должно быть пустым',
      }),
    password: Joi
      .string()
      .required()
      .min(6)
      .messages({
        'string.min': 'Минимальная длина пароля 6 символа',
        'string.empty': 'Поле "password" не должно быть пустым',
        'any.required': 'Поле "password" не должно быть пустым',
      }),
  }),
});

const createUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi
      .string()
      .required()
      .email()
      .messages({
        'string.email': 'Не валидное поле "email"',
        'string.empty': 'Поле "email" не должно быть пустым',
        'any.required': 'Поле "email" не должно быть пустым',
      }),
    password: Joi
      .string()
      .required()
      .min(6)
      .messages({
        'string.min': 'Минимальная длина пароля 6 символа',
        'string.empty': 'Поле "password" не должно быть пустым',
        'any.required': 'Поле "password" не должно быть пустым',
      }),
    name: Joi
      .string()
      .min(2)
      .max(30)
      .required()
      .messages({
        'string.empty': 'Поле "name" не должно быть пустым',
        'string.min': 'Минимальная длина пароля 2 символа',
        'string.max': 'Максимальная длина пароля 30 символов',
        'any.required': 'Поле "name" не должно быть пустым',
      }),
  }),
});

const userUpdateValidation = celebrate({
  body: Joi.object().keys({
    email: Joi
      .string()
      .email()
      .required()
      .messages({
        'string.required': 'Поле "email" не должно быть пустым',
      }),
    name: Joi
      .string()
      .min(2)
      .max(30)
      .required()
      .messages({
        'string.min': 'Минимальная длина поля "name": 2 символа',
        'string.max': 'Минимальная длина поля "name": 30 символов',
        'string.required': 'Поле "name" должно быть заполнено',
      }),
  }),
});

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi
      .string()
      .required()
      .messages({
        'string.base': 'Поле "country" должно быть строкой',
        'string.empty': 'Поле "country" не должно быть пустым',
        'any.required': 'Поле "director" должно быть заполнено',
      }),
    director: Joi
      .string()
      .required()
      .messages({
        'string.base': 'Поле "director" должно быть строкой',
        'string.empty': 'Поле "director" не должно быть пустым',
        'any.required': 'Поле "director" должно быть заполнено',
      }),
    duration: Joi
      .number()
      .required()
      .messages({
        'number.base': 'Поле "duration" должно быть числом',
        'number.empty': 'Поле "duration" не должно быть пустым',
        'any.required': 'Поле "duration" должно быть заполнено',
      }),
    year: Joi
      .string()
      .required()
      .messages({
        'string.base': 'Поле "year" должно быть строкой',
        'string.empty': 'Поле "year" не должно быть пустым',
        'any.required': 'Поле "year" должно быть заполнено',
      }),
    description: Joi
      .string()
      .required()
      .messages({
        'string.base': 'Поле "description" должно быть строкой',
        'string.empty': 'Поле "description" не должно быть пустым',
        'any.required': 'Поле "description" должно быть заполнено',
      }),
    image: Joi
      .string()
      .required()
      .pattern(pattern)
      .messages({
        'string.base': 'Поле "image" должно быть строкой',
        'string.empty': 'Поле "image" не должно быть пустым',
        'any.required': 'Поле "image" должно быть заполнено',
        'string.pattern': 'Поле "image" должно быть валидным',
      }),
    trailer: Joi
      .string()
      .required()
      .pattern(pattern)
      .messages({
        'string.base': 'Поле "trailer" должно быть строкой',
        'string.empty': 'Поле "trailer" не должно быть пустым',
        'any.required': 'Поле "trailer" должно быть заполнено',
        'string.pattern': 'Поле "trailer" должно быть валидным',
      }),
    thumbnail: Joi
      .string()
      .required()
      .pattern(pattern)
      .messages({
        'string.base': 'Поле "thumbnail" должно быть строкой',
        'string.empty': 'Поле "thumbnail" не должно быть пустым',
        'any.required': 'Поле "thumbnail" должно быть заполнено',
        'string.pattern': 'Поле "thumbnail" должно быть валидным',
      }),
    movieId: Joi
      .number()
      .required()
      .messages({
        'number.base': 'Поле "movieId" должно быть числом',
        'number.empty': 'Поле "movieId" не должно быть пустым',
        'any.required': 'Поле "movieId" должно быть заполнено',
      }),
    nameRU: Joi
      .string()
      .required()
      .messages({
        'string.base': 'Поле "nameRU" должно быть строкой',
        'string.empty': 'Поле "nameRU" не должно быть пустым',
        'any.required': 'Поле "nameRU" должно быть заполнено',
      }),
    nameEN: Joi
      .string()
      .required()
      .messages({
        'string.base': 'Поле "nameEN" должно быть строкой',
        'string.empty': 'Поле "nameEN" не должно быть пустым',
        'any.required': 'Поле "nameEN" должно быть заполнено',
      }),
  }),
});

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi
      .string()
      .hex()
      .length(24)
      .required()
      .messages({
        'string.base': 'Поле "_id" должно быть строкой',
        'string.empty': 'Поле "_id" не должно быть пустым',
        'string.hex': 'Поле "_id" должно быть шестнадцатеричным числом',
        'string.length': 'Поле "_id" должно иметь длину в 24 символа',
        'any.required': 'Поле "_id" должно быть заполнено',
      }),
  }),
});

module.exports = {
  createUserValidation,
  loginValidation,
  userUpdateValidation,
  createMovieValidation,
  deleteMovieValidation,
};
