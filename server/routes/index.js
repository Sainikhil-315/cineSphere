// routes/index.js
const express = require('express');
const router = express.Router();
const authRoutes = require('./api/authRoutes');
const moviesRoutes = require('./api/moviesRoutes');

// Mount the entire router modules at their respective paths
router.use('/api/auth', authRoutes);
router.use('/api/movies', moviesRoutes);

module.exports = router;