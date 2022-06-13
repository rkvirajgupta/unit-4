const express = require("express");

const app = express();

app.use(logger);  // logger() we dont have need to call it here because
//app.use always call it so we write only logger insted of logger()

app.get("/users",(req,res)=>{

    console.log("users");

 return   res.send({route:"/users"});


});

app.get("/students",(req,res)=>{

console.log("students");

return res.send({route:"/students"});   
//return is always close the function and never execute rest things
//after the return ((return ke baad ki koi thing nahi calati hai ))


});


function logger(req,res,next){

console.log("before route handler");

next();


}


app.listen(5000,()=>{
    console.log("yes i am here")
});