const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect("mongodb+srv://virajgupta:Virajgupta12345@cluster0.wmplk.mongodb.net/redis?retryWrites=true&w=majority");
};

// function connect(){
//     return mongoose.connect("mongodb+srv://virajgupta:Virajgupta12345@cluster0.wmplk.mongodb.net/authorisation?retryWrites=true&w=majority");

// }

module.exports= connect;