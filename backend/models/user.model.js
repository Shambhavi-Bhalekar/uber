const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema=new Schema(
    {
        fullname:{
            firstname:{
                type:String,
                required:true,
                minlength: [3,'First name should atleast be 3 characters long']
            },
            lastname:{
                type:String,
                minlength: [3,'Last name should atleast be 3 characters long']
            },
        },
        email:{
            type:email,
            required:true,
            unique:true,
            minlength: [3,'Email should atleast be 3 characters long']
        },
        password:{
            type:String,
            required:true,
            select:false,
            minlength: [3,'Password should atleast be 3 characters long']
        },
        socketId:{
            type:String,
        }
    }
)

userSchema.methods.generateAuthToken = function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET);
    return token;
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10);
}

const userModel=mongoose.model('User',userSchema);
module.exports=userModel;