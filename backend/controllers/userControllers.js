const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const findOne = require("../models/userModel");
const bcrypt = require('bcryptjs')



require('../config/db')
const e = require('express')

const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password, files } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter all the Feilds");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        files,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,

            files: user.files,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("User not found");
    }
});

const authUser = asyncHandler(async(req, res) => {
    console.log(req.body)
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ error: "please fill the detail" })
        }
        const userLogin = await User.findOne({ email: email })
        var isMatch = true
        console.log(userLogin)
        if (userLogin) {
            console.log(password)
            if (password === userLogin.password) {
                isMatch = true
            } else {
                isMatch = false
            }
            console.log(isMatch)
            if (!isMatch) {

                res.json({ message: "invalid credential" })
            } else {
                res.json({ message: "user login sucessfully" })
            }
        } else {
            res.json({ message: "invalid crendential email" })
        }
    } catch (err) {
        console.log(err)

    }
})

const allUsers = asyncHandler(async(req, res) => {
    const keyword = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: "1" } },
            { name: { $regex: req.query.search, $options: "1" } }
        ]
    } : {};

    const users = await User.find({ _id: { $ne: req.user._id } });
    res.send(users)

})


module.exports = { registerUser, authUser, allUsers }