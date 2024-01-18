const express = require('express');
require("../models/user.model");
const userModel = require("../models/user.model")

const router = express.Router();

router.get("/users", async(req, res)=>{
    try {
        const getUsers = await userModel.find();
        if(getUsers){
            res.status(200).json({usersData : getUsers, message : "Users Found"})
        }else{
            res.status(404).json({error : "Users Not Found"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error : "Error Occurred while Fetching Users"})
    }
});

router.post("/userbyid", async(req, res)=>{
    const {id} = req.body;

    if(!id){
        return res.status(500).json({error : "ID Not Found"})
    }else{
        try {
            const fetch = await userModel.findOne({_id : id});

            if(fetch){
                return res.status(200).json({message : "User Found", user : fetch});
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