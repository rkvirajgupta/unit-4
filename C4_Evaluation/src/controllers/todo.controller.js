const express = require("express");

const router= express.Router();

const authenticate = require("../middlewares/authenticate")

const authorise = require("../middlewares/authorise");

const Todo = require("../models/todo.model");


router.get("",async (req,res) =>{

try {
        const todo = await Todo.find();

        return res.status(200).send(todo);
} catch (error) {

    return res.status(400).send({message:error.message})
    
}

})

router.post("",authenticate,async (req,res)=>{

    req.body.user_id= req.userID;

    try {
        const todo = await Todo.create(req.body);

        return res.status(200).send(todo);
} catch (error) {

    return res.status(400).send({message:error.message})
    
}



})

router.get("/:todoid",authenticate,authorise,async (req,res) =>{
    req.body.user_id= req.userID;


    try {
            const todo = await Todo.findById(req.params.todoid);
    
            return res.status(200).send(todo);
    } catch (error) {
    
        return res.status(401).send({message:error.message})
        
    }
    
    })

    router.patch("/:todoid",authenticate,authorise,async (req,res) =>{
        req.body.user_id= req.userID;


        try {
                const todo = await Todo.findByIdAndUpdate(req.params.todoid,req.body,{new:true});
        
                return res.status(200).send(todo);
        } catch (error) {
        
            return res.status(401).send({message:error.message})
            
        }
        
        })

        router.delete("/:todoid",authenticate,authorise,async (req,res) =>{
            req.body.user_id= req.userID;


            try {
                    const todo = await Todo.findByIdAndDelete(req.params.todoid);
            
                    return res.status(200).send(todo);
            } catch (error) {
            
                return res.status(401).send({message:error.message})
                
            }
            
            })

            module.exports=router;