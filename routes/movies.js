const router = require('express').Router();

const {
  createMovieValidation,
  deleteMovieValidation,
} = require('../middlewares/celebrate');

const {
  getMuvies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMuvies);
router.post('/', createMovieValidation, createMovie);
router.delete('/:_id', deleteMovieValidation, deleteMovie);

module.exports = router;
