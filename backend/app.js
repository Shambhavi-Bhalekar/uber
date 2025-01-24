const dotenv = require('dotenv');
dotenv.config()
const cors = require('cors');
const express = require('express');
const app=express()
app.use(cors());
const connecttoDB=require('./db/db');
const userRoutes=require('./routes/user.routes');
const captainRoutes=require('./routes/captain.routes');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const cookieParser=require('cookie-parser');
connecttoDB();

app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.use('/users',userRoutes);
app.use('/captains',captainRoutes);


module.exports=app;