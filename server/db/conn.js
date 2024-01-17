const mongoose = require('mongoose');
const env = require('dotenv');

env.config({path : 'config.env'});
const db = process.env.DB;

mongoose.connect(db, {useNewUrlParser : true, useUnifiedTopology : true})
.then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err);
})