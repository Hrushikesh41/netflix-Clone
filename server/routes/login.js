const express = require('express');
const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post("/login", async(req, res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(404).json({error : "Email or Password Not Found"})
    }else{
        try {
            const fetchEmail = await userModel.findOne({email : email});

            if(fetchEmail){
                const isMatch = await bcrypt.compare(password, fetchEmail.password);
                if(isMatch){
                    return res.status(200).json({message : "Login Successful"})
                }else{
                    return res.status(404).json({error : "Invalid Password"})
                }
            }else{
                return res.status(404).json({error : "User Not Found"})
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({error : "Some Error Occurred"})
        }
    }
})

module.exports = router;