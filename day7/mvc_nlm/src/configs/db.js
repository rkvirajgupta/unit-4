const mongoose=require("mongoose")

const connect=()=>{
    return mongoose.connect(`mongodb+srv://${env.SECRET_KEY}@cluster0.yca2t.mongodb.net/mvc`)
}

module.exports=connect;