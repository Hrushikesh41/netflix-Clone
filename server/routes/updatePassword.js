const express = require('express');
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.patch("/password", async(req, res)=>{
    const {id, password} = req.body;

    if(!id || !password){
        return res.status(404).json({error : "ID or Password Not Found"})
    }else{
        try {
            const fetch = await userModel.findById({_id : id});

        if(fetch){
            const hashPass = await bcrypt.hash(password, 12);
            const update = await userModel.findByIdAndUpdate({_id : id, }, {password : hashPass});

            if(update){
                return res.status(200).json({message : "Password Updated"})
            }else{
                return res.status(400).json({error : "Error Occurred While Updating Password"})
            }
        }else{
            return res.status(404).json({error : "ID Not Found"})
        }
        } catch (error) {
            console.log(error);
            return res.status(500).json({error : "Some Error Occurred"})
        }
    }
});

module.exports = router;