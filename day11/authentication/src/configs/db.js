const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect("mongodb+srv://virajgupta:Virajgupta12345@cluster0.wmplk.mongodb.net/authentication_assignment?retryWrites=true&w=majority");
};

module.exports= connect;