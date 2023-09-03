const mongoose = require("mongoose");

module.exports = () => {

    return mongoose.connect(`mongodb+srv://${env.SECRET_KEY}@cluster0.wmplk.mongodb.net/c-3?retryWrites=true&w=majority`);
};