const express = require('express');
const router = express.Router();

const { getMovies, getMovie, deleteMovie } = require('../../controllers/movieController');

router.get('/', getMovies);
router.get('/:id', getMovie);
router.delete('/:id', deleteMovie);

module.exports = router;