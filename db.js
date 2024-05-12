const mongoose = require('mongoose')
require("dotenv").config();
//const mongoURL = 'mongodb://localhost:27017/hotels';
const mongoURL = process.env.MONGODB_URL;

mongoose.connect(mongoURL,{
    useNewUrlParser : true,
    useUnifiedTopology :true
})

const db = mongoose.connection;

db.on('connected',()=>{
    console.log("connected to mongoDB server ")
})
db.on('error',(err)=>{
    console.error("connection error ",err);
})
db.on('disconnected',()=>{
    console.log("disconnected from  mongoDB server ")
})

module.exports =db;