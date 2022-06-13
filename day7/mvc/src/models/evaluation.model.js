const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema({
    dateOfEvaluation :{type:String,require:true},
    instructor :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    batchId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"batchId",
        required:true
    }
},{
    versionKey:false
})

module.exports = mongoose.model("evaluation",evaluationSchema)