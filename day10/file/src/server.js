const connect=require("./configs/db")
const app=require("./index");

app.listen(5050,async()=>{
    try{
     await connect()
    }
    catch(err){
        console.error(err)
    }
    console.error("listening on port 5050")
})