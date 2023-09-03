const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect(
    `mongodb+srv://${evn.SECRET_KEY}@cluster0.ljuvz.mongodb.net/web15-fileuploads?retryWrites=true&w=majority`
  );
};
