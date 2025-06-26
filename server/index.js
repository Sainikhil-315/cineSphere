// app.js
const express = require('express');
const routes = require('./routes/index.js');
const mongodb = require('./db/connection.js');
require('dotenv').config();

mongodb();
const app = express();
const port = 5000;

// IMPORTANT: Middleware should be registered BEFORE routes
app.use(express.json());
app.use('/', routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});