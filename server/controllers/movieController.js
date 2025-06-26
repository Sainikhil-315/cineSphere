const express = require('express');
const WishList = require('../models/WishList');

const getMovies = (req, res) => {
    res.status(200).send('getMovies');
};

const getMovie = (req, res) => {
    res.status(200).send(`getMovie with id ${req.params.id}`);
};

const deleteMovie = (req, res) => {
    res.status(200).send(`deleteMovie with id ${req.params.id}`);
};

module.exports = {
    getMovies,
    getMovie,
    deleteMovie
};
