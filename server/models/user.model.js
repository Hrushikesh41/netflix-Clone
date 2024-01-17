const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    password : {
        type : String, 
        required : true,
        minlength : 8
    }
});

const userModel = new mongoose.model("USERS", userSchema);

module.exports = userModel;