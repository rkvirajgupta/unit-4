const app=require("./index")
const connect=require("./config/db")
app.listen(5050,async()=>{
    try{
        await connect();
    }
    catch(err){
        console.log(err)
    }

    console.log("listening port 5050")
})