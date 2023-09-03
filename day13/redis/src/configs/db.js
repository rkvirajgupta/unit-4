const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect(`mongodb+srv://${evn.SECRET_KEY}@cluster0.wmplk.mongodb.net/authorisation?retryWrites=true&w=majority`);
};
