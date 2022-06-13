const express = require("express");
const {register,login} = require("./controller/user.controller")
const postController = require("./controller/post.controller")
const app = express();

app.use(express.json())

app.use("/register",register)
app.use("/login",login)
app.use("/post",postController)

module.exports = app;