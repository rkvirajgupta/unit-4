const mongoose = require("mongoose");


module.exports= ()=>{
    return mongoose.connect("mongodb+srv://virajgupta:Virajgupta12345@cluster0.wmplk.mongodb.net/email?retryWrites=true&w=majority")
};


//OR

// const mongoose = require("mongoose");

// const connect = () =>{
//     return mongoose.connect("mongodb+srv://virajgupta:Virajgupta12345@cluster0.wmplk.mongodb.net/mvc?retryWrites=true&w=majority")
// }

// module.exports = connect;