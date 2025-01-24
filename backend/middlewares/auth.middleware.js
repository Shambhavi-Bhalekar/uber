const userModel=require('../models/user.model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const Blacklist = require('../models/blacklist.model');

module.exports.authUser=async (req,res,next)=>{

    const token=req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message:'Unauthorized'});
    }
    //to make sure that user has not stored the token in the local storage
    const isBlacklisted=await userModel.findOne({token:token});
    if(isBlacklisted){
        return res.status(401).json({message:'Unauthorized'});
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await userModel.findById(decoded.id);
        req.user=user;
        return next();
    }catch(err){
        return res.status(401).json({message:'Unauthorized'});
    }
}