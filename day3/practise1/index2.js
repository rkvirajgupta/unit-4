// const express = require("express");

// const app = express();

// app.use(logger);



// app.get("/users",(req,res)=>{

// return res.send({route:"/users", role:req.role});


// });

// app.get("/admin",(req,res)=>{

//     return res.send({route:"/admin" , role:req.role})
    
    
//     });

//     app.get("/students",(req,res)=>{

//         return res.send({route:"/students" , role:req.role})
        
        
//         });  


// function logger(req,res,next){

//     console.log(req.path);

//     if(req.path === "/users"){

//         req.role="users";
//     }
//     else if(req.path === "/admin"){

//         req.role = "admin";
//     }
//     else {
//         req.role="students";
//     }

//     console.log("before route handler logger  ")
        
//   next();
        
// console.log("after route handler logger")
//         }

//         app.listen(5000,()=>{
//             console.log("yes i am here")
//         });

        

//or we can use loggr like this

const express = require("express");

const app = express();




app.get("/users",logger,(req,res)=>{

    // we can as many loggrs as we want 
    //and we can use same logger also see

// app.get("/users",logger,logger,(req,res)=>{

return res.send({route:"/users", role:req.role});


});

app.get("/admin",(req,res)=>{

// app.get("/admin",logger,(req,res)=>{

    return res.send({route:"/admin" , role:req.role})
    
    
    });

    app.get("/students",(req,res)=>{
        // app.get("/students",logger,(req,res)=>{


        return res.send({route:"/students" , role:req.role})
        
        
        });  


function logger(req,res,next){

    console.log(req.path);

    if(req.path === "/users"){

        req.role="users";
    }
    else if(req.path === "/admin"){

        req.role = "admin";
    }
    else {
        req.role="students";
    }

    // console.log("before route handler logger  ")
        
  next();
        
// console.log("after route handler logger")
        }

        app.listen(5000,()=>{
            console.log("yes i am here")
        });

        