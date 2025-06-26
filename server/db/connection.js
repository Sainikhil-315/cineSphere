const express = require('express');
const mongoose = require('mongoose');

const mongoURI = 'mongodb://127.0.0.1:27017/movies';
const mongodb = async () => {
    const conn = await mongoose.connect(mongoURI);
    console.log("MongoDB connected");
}

module.exports = mongodb;