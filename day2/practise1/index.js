const express = require("express");

const app  = express();

app.get("/user",(req,res)=>{

req.send('hi')


});

app.listen(5000,()=>{


    console.log("hi")
})