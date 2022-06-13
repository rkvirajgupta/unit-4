const express = require("express");

const app = express();

app.get("/products",loggedIn("seller"),(req,res)=>{
    // app.get("/products",loggedIn(["seller","admin"]),(req,res)=>{


return res.send("yes you can get the product");

}); 

function loggedIn(role){
return function logger(req,res,next){
if(role==="seller"){
    return next();
}
return res.send("not allowed");
}
}

// function loggedIn(role){

//     return function logger(req,res,next){
    
//     if(role[0]==="seller"){
//         return next();
//     }else{
//         return next();
//     }
//     return res.send("not allowed");
    
//     }
    
//     }



 app.listen(5000,()=>{
          console.log("yes i am here")
     });