const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect(`mongodb+srv://${evn.SECRET_KEY}@cluster0.ljuvz.mongodb.net/web15-fileuploads?retryWrites=true&w=majority`
  );
};

module.exports= connect;