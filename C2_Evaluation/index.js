const express = require("express");
const app = express();

const mangoose = require("mangoose");
const { default: mongoose } = require("mongoose");

const { type } = require("os");

const connectDb= ()=>{
    return mongoose.connnect(`mongodb+srv://${env.SECRET_KEY}@cluster0.wmplk.mongodb.net/test`)
};
//users details
const userSchema = mongoose.Schema({

firstName:{type:String,required:true},
middleName:{type:String,required:true},
lastName:{type:String,required:true},
age:{type:String,required:true},
email:{type:String,required:true},
address:{type:String,required:true},
gender:{type:String},
type:{type:String}
},
{
    timeStamp:true

});
const User = mongoose.model("user",userSchema);

//branch details
const branchSchema = mongoose.Schema({

name:{type:String,required:true},
address:{type:String,required:true},
IFSC:{type:String,required:true},
MICR:{type:String,required:true},

},
{
    timeStamp:true

});

const Branch = mongoose.model("branch",branchSchema);

//master details
const masterSchema = mongoose.Schema({

    balance:{type:String,required:true},
    Uid:{type:mongoose.Schema.Types.ObjectId,ref:"user"},    
    
    },
    {
        timeStamp:true
    
    });

    const Master = mongoose.model("master",masterSchema);

    //saving details
const savingSchema = mongoose.Schema({
    account:{type:String,required:true,unique :true},
    balance:{type:String,required:true},
    interestrate:{type:String,required:true},
    Uid:{type:mongoose.Schema.Types.ObjectId,ref:"master"},    

    
    
    },
    {
        timeStamp:true
    
    });

    const Saving = mongoose.model("saving",savingsSchema);

    //fixed details
const fixedSchema = mongoose.Schema({

    account_number:{type:String,required:true,unique:true},
    balance:{type:String,required:true},
    interestrate:{type:String,required:true},
    startdate:{type:String,required:true},
    maturitydate:{type:String,required:true},
    },
    {
        timeStamp:true
    
    });
    
    const Fixed = mongoose.model("fixed",fixedSchema);



app.listen("4000",async()=>{
    try{
        await connectDb();
    }
    catch(e){
        console.log(e);
    }
})