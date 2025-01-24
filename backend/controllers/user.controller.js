const userModel = require('../models/user.model');
const userServices = require('../services/user.service');
const {validationResult} = require('express-validator');
const blacklist=require('../models/blacklist.model');
module.exports.registerUser = async (req, res,next) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {fullname,email,password}=req.body;  
    const isUserAlreadyExist=await userModel.findOne({email});
    if(isUserAlreadyExist){
        return res.status(400).json({errors:[{msg:'User already exists'}]});
    }
    const hashpassword=await userModel.hashPassword(password); 
    const user=await userServices.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password:hashpassword
    });

    const token=await userModel.generateAuthToken();
    res.status(201).json({token,user});

}

module.exports.loginUser = async (req, res,next) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email,password}=req.body;
    const user=await userModel.findOne({email}).select('+password');
    //select('+password') is used to select the password field as it is set to select:false in the schema
    if(!user){
        return res.status(404).json({message:'Invalid credentials'});
    }
    const isMatch=await userModel.comparePassword(password,user.password);
    if(!isMatch){
        return res.status(404).json({message:'Invalid credentials'});
    }

    const token=user.generateAuthToken();
    res.status(200).json({token,user});

}

module.exports.getUserProfile = async (req, res,next) => {
    res.status(200).json(req.user);
}

module.exports.logoutUser = async (req, res,next) => {
    res.clearCookie('token');
    const token=req.headers.authorization.split(' ')[1] || req.cookies.token;
    await blacklist.create({token});
    res.status(200).json({message:'Logged out successfully'});
}

//above code is the function that will be called when a POST request is made to /register
