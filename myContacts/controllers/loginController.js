const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

// GET /
const getLogin = (req, res) => {
    res.render("home");
};

// POST /
const loginUser = asyncHandler(async(req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if(!user) {
        return res.json({message: '일치하는 사용자가 없습니다.'});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return res.json({message: '비밀번호가 일치하지 않습니다.'});
    }

    const token = jwt.sign({id:user._id}, jwtSecret); //토큰 만들기
    res.cookie('token', token, {httpOnly: true}); // 쿠키에 토큰 담아서 응답
    res.redirect('/contacts');
});

// GET /register
const getRegister = (req, res) => {
    res.render('register');
}

// POST /register
const registerUser = asyncHandler(async(req, res) => {
    const {username, password, password2} = req.body;

    if(password === password2) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password:hashedPassword });
        res.json( { message: "Register successful", user});
    }else {
        res.send("Register failed");
    }
    res.render('register');
});

module.exports = { getLogin, loginUser, getRegister, registerUser } ;