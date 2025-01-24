const express = require('express');
const router = express.Router();
const {body}=require('express-validator');
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/register',[
    body('fullname.firstname').isLength({min:3}).withMessage('First name should atleast be 3 characters long'),
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({min:6}).withMessage('Password should atleast be 6 characters long')
],
userController.register);

//userController.register is the function that will be called when a POST request is made to /register

router.post('/login',[
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({min:6}).withMessage('Password should atleast be 6 characters long')
]
,userController.loginUser);

router.get('/profile',auth, userController.getUserProfile);
//auth is a middleware that will be called before userController.getUserProfile

router.get('/logout',auth, userController.logoutUser);

module.exports = router;