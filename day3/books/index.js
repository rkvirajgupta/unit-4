const express = require("express");

const app = express();

const books = [
    {"Game of Thrones": "George R.R. Martin"},
    {"Harry Potter": "J.K Rowling"},
]

app.use(allbooks)
app.get("/books",(req,res)=>{   
    res.send(books)
})

function allbooks(req,res,next){
console.log("Fetching all books")
next();
}

app.get("/books/:name",singleBook,(req,res)=>{
    res.send({bookName:req.name});
})

function singleBook(req,res,next){
    console.log(req.params.name);
    req.name = req.params.name;
    next();
}

app.listen(5000,()=>{
    console.log("hi i am listening");
})