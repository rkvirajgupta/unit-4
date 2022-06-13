const express = require("express");
const crudController = require("./crud.controller")
const User = require("../models/user.model")
const router = express.Router()


router.get("", async (req,res)=>{
    try {
        const users = await User.find().lean().exec();
        return res.status(200).send(users)
    } catch (error) {
        return res.status(500).send({message:error.message})
    }
})

router.post("/",crudController.post(User))


module.exports = router