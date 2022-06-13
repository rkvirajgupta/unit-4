const app = require("./index");
const connect = require("./configs/db")

app.listen(5000,async()=>{
    try {
        await connect();
    console.log("Listenng on port 5000")
    } catch (error) {
        console.error(error);
    }
})