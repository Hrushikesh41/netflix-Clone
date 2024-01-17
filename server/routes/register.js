const express = require('express');
const userModel = require('../models/user.model');
require("../db/conn");
require("../models/user.model");

const router = express.Router();

router.post("/user", async(req, res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(422).json({error : "Please Add the required Fields"})
    }else{
        try {
            const fetchUser = await userModel.findOne({email : email});

            if(fetchUser){
                return res.status(500).json({error : "User Already Exist"});
            }else{
                var user = new userModel({email, password});
                var result = user.save();

                if(result){
                    return res.status(200).json({message : "Registration Successful"})
                }else{
                    return res.status(500).json({error : "Error Occurred while Registering"});
                }
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({error : "Some Error Occurred"});
        }
    }
});

module.exports = router;