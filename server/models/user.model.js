const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

userSchema.pre("save", async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12)
    }
    next();
})

const userModel = new mongoose.model("USERS", userSchema);

module.exports = userModel;