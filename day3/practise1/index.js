const express = require("express");

const app = express();

app.use(logger);  //middlewares



app.get("/users",(req,res)=>{

return res.send({route:"/users"})


});
app.use(logger1);
app.get("/students",(req,res)=>{

    return res.send({route:"/students"})
    
    
    });

function logger1(req,res,next){

console.log("before route handler logger 1 ")

next();

console.log("after route handler logger1")

}
function logger(req,res,next){

    console.log("before route handler logger  ")
        
next();
        
console.log("after route handler logger")
        }

        app.listen(5000,()=>{
            console.log("yes i am here")
        });