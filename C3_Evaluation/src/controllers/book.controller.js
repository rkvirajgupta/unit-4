const express = require("express");

const Book = require("../models/book.model");

const router = express.Router();

const path = require("path")


router.get("",async (req,res)=>{
try {

    const page = req.query.page||1;

    const pagesize = req.query.pagesize||10;
     
    const skip = (page-1)*pagesize;


    const books = await Book.find().skip(skip).limit(pagesize).lean().exec();

    

    return res.status(200).send({books:books});
} catch (error) {

    return res.status(500).send({message:error.message})
    
}

})

router.post("/", async(req,res)=>{

    try{

        const book = Book.create(req.body);

        return res.status(200).send({book:book});
 
        
    } catch (error) {

        return res.status(500).send({error:error.message})
        
    }



})


module.exports= router;
