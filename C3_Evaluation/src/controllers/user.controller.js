const express = require("express");

const {body, validationResult} = require("express-validator");

const User = require("../models/user.model");

const router = express.Router();

router.get("",async (req,res)=>{
try {

    const page = req.query.page||1;

    const pagesize = req.query.pagesize||10;
     
    const skip = (page-1)*pagesize;
    const users = await User.find().skip(skip).limit(pagesize).lean().exec();

    return res.status(200).send({users:users});
} catch (error) {

    return res.status(500).send({message:error.message})
    
}

})

router.post(
    "/",

    body("firstName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("first name cannot be empty")
    .isLength({min:3,max:30})
    .withMessage("first name atleast of 3 characters"),

body("lastName")
.trim()
.not()
.isEmpty()
.withMessage("first name cannot be empty")
.isLength({min:3,max:30})
.withMessage("first name atleast of 3 characters"),

body("age")
.not()
.isEmpty()
.withMessage("please provide age")
.isNumeric()
.withMessage("age must be number")
.custom((val)=>{

    if(val<1||val>150){
        throw new Error("Incorrect age provided");
    }
    return true;
}),

body("email")
.not()
.isEmpty()
.withMessage("please provide email"),

body("profileImages")
.not()
.isEmpty()
.withMessage("please provide profileImages"),


async(req,res)=>{

    try {

        const errors = validationResult(req);

        if(!errors.isEmpty()){

            return res.status(400).send({errors:errors.array()});
        }


        const user = User.create(req.body);

        return res.status(200).send({user:user});
 
        
    } catch (error) {

        return res.status(500).send({error:error.message})
        
    }



}
)

module.exports= router;
