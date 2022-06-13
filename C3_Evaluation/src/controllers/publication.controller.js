const express = require("express");

const Publication = require("../models/publication.model");

const router = express.Router();

router.get("",async (req,res)=>{
try {
    const page = req.query.page||1;

    const pagesize = req.query.pagesize||10;
     
    const skip = (page-1)*pagesize;

    const publications = await Publication.find().skip(skip).limit(pagesize).lean().exec();

    return res.status(200).send({publications:publications});
} catch (error) {

    return res.status(500).send({message:error.message})
    
}

})

router.post("/", async(req,res)=>{

    try{

        const publications = Publication.create(req.body);

        return res.status(200).send({publications:publications});
 
        
    } catch (error) {

        return res.status(500).send({error:error.message})
        
    }



})


module.exports= router;
