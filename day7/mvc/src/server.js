const app = require("./index")

const connect = require("./configs/db")

app.listen(5050, async() =>{
    try {
        await connect();
    } catch (error) {
        console.log(error)
    }
    console.log("Listening on Port 5050");

});