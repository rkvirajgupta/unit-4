const Todo = require("../models/todo.model");


const authorise = async(req,res)=>{

try {
      
    let todo= await Todo.findById(req.params.todoid);

    if(req.userID===todo.user_id.toString()){
        return next();

    }

    return res.status(401).send("you are not authorise this page")

} catch (error) {
    return res.status(400).send(error)

}



}

module.exports= authorise;