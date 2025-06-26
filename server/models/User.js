const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const secretKey = "nikhil";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },  
    password: {
        type: String,
        required: true
    }
});

UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id }, secretKey);
};

module.exports = mongoose.model('User', UserSchema);