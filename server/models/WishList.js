const express = require('express');
const mongoose = require('mongoose');

const WishListSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    movieid: {
        type: String,
        required: true,
        unique: true,
    },
})