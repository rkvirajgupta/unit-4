const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect(
    `mongodb+srv://${env.SECRET_KEY}@cluster0.ljuvz.mongodb.net/web15-atlas?retryWrites=true&w=majority`
  );
};
