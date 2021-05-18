const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },

  director: {
    type: String,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },

  year: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
    },
  },

  trailer: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
    },
  },

  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  movieId: {
    type: Number,
    required: true,
  },

  nameRU: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },

  nameEN: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
});

module.exports = mongoose.model('movie', movieSchema);
