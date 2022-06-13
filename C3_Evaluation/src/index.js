const express = require("express");

const userController = require("./controllers/user.controller")
const bookController = require("./controllers/book.controller")
const commentController = require("./controllers/comment.controller")
const publicationController = require("./controllers/publication.controller")

const app = express();
app.use(express.json());

app.use("/users",userController);
app.use("/books",userController);
app.use("/comments",userController);
app.use("/publications",userController);

module.exports = app;