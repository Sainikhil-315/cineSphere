const express = require('express');
const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;


const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ name, email, password: hashedPassword });
        const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            message: "User registered successfully",
        });
    } catch (err) {
        res.status(400).json({ success: false, message: "Error occurred", error: err.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) {
        return res.status(400).json({ success: false, message: "Invalid Credentials" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        return res.status(400).json({ success: false, message: "Incorrect Password" });
    }
    const token = jwt.sign({ id: user._id }, secretKey);
    res.json({
        success: true,
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        }
    })
};

const logout = (req, res) => {
    res.status(200).json({ success: true, message: "user logged out", data: {}});
};

const me = async (req, res) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, data: user});
};

module.exports = {
    register,
    login,
    logout,
    me
};
