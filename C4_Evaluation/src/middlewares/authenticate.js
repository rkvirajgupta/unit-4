const jwt = require("jsonwebtoken");

require("dotenv").config()

const verifyToken = (token) =>{

    return new Promise((resolve,reject)=>{

         jwt.verify(token, process.env.SECRET_KEY,(err,decoded)=>{

                   if(err) return reject(err)

                   return resolve(decoded)

         })

    })

}


const authenticate= async (req,res,next) =>{

    if(!req.headers.authorization){
        return res.status(400).send({message:"authorization failed"});
    }

    if(req.headers.authorization.startWith("Bearer ")){
        return res.status(400).send({message:"authorization failed"});
    }
      
    const token = req.headers.authorization.trim().split(" ")[1];

    let decoded;

    try{
         
        decoded = await verifyToken(token)

    }
     
    catch(err){
        res.status(400).send({message:"authorization token wrong or not found"})
    }

    req.userID = decoded.user_id;

    next();

}

module.exports=authenticate;