const mongoose = require("mongoose");

module.exports = () => {

    return mongoose.connect("mongodb+srv://virajgupta:Virajgupta12345@cluster0.wmplk.mongodb.net/c-3?retryWrites=true&w=majority");
};