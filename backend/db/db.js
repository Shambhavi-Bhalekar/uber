const mongoose=require('mongoose');

function connecttoDB(){
    mongoose.connect(process.env.DB_CONNECT,{})
    .then(()=>{
        console.log('Connected to DB');
    })
    .catch((err)=>{
        console.log('Error in connecting to DB',err);
    });
}

module.exports=connecttoDB;