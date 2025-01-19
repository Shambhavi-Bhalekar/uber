const userModel = require('../models/user.model');
const userServices = require('../services/user.service');
const {validationResult} = require('express-validator');

module.exports.registerUder = async (req, res,next) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {fullname,email,password}=req.body;  
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
//above code is the function that will be called when a POST request is made to /register
