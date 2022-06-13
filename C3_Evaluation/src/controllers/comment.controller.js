const express = require("express");

const Comment = require("../models/comment.model");

const router = express.Router();

router.get("",async (req,res)=>{
try {

    const page = req.query.page||1;

    const pagesize = req.query.pagesize||10;
     
    const skip = (page-1)*pagesize;
    const comments = await Comment.find().skip(skip).limit(pagesize).lean().exec();

    return res.status(200).send({comments:comments});
} catch (error) {

    return res.status(500).send({message:error.message})
    
}

})

router.post("/", async(req,res)=>{

    try{

        const comments = Comment.create(req.body);

        return res.status(200).send({comments:comments});
 
        
    } catch (error) {

        return res.status(500).send({error:error.message})
        
    }



})


module.exports= router;
