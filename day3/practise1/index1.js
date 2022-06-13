const express = require("express");

const app = express();

app.use(logger);



app.get("/users",(req,res)=>{

return res.send({route:"/users"})


});

app.get("/admin",admin,(req,res)=>{

    return res.send({route:"/admin"})
    
    
    });

function admin(req,res,next){

console.log("before route handler admin ")

next();

console.log("after route handler admin")

}
function logger(req,res,next){

    console.log(req.path);

    console.log("before route handler logger  ")
        
next();
        
console.log("after route handler logger")
        }

        app.listen(5000,()=>{
            console.log("yes i am here")
        });