const captainModel=require('../models/captain.model');

module.exports.createCaptain=async({
    firstname,lastname,email,password,vehicleColor,vehiclePlate,vehicleCapacity,vehicleType
})=>{
    if(!firstname||!lastname||!email||!password||!vehicleColor||!vehiclePlate||!vehicleCapacity||!vehicleType){
        throw new Error('All fields are required');
    }
    const captain=new captainModel({
        fullname:{
            firstname,
            lastname,
        },
        email,
        password,
        vehicle:{
            color:vehicleColor,
            plate:vehiclePlate,
            capacity:vehicleCapacity,
            vehicleType,
        }
    })
    return captain;
}