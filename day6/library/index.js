const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const connect = () => {
  return mongoose.connect(
    "mongodb+srv://virajgupta:Virajgupta12345@cluster0.wmplk.mongodb.net/library?retryWrites=true&w=majority"
  );
};

// Section Schema

const sectionSchema = new mongoose.Schema(
  {
    sectionName: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Section = mongoose.model("section", sectionSchema);

// Section CRUD

app.get("/sections", async (req, res) => {
  try {
    const sections = await Section.find({}).lean().exec();
    return res.status(200).send({ sections: sections });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

app.post("/sections", async (req, res) => {
  try {
    const section = await Section.create(req.body);
    return res.status(201).send(section);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// Books Schema

const booksSchema = new mongoose.Schema(
  {
    bookName: { type: String, required: true },
    bookBody: { type: String, required: true },
    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "section",
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "author",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Book = mongoose.model("book", booksSchema);

// Books CRUD

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({}).lean().exec();
    return res.status(200).send({ books: books });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

app.post("/books", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    return res.status(201).send(book);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// Author Schema

const authorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
},{
    versionKey:false
});

const Author = mongoose.model("author",authorSchema)

// Author CRUD

app.get("/authors", async (req, res) => {
    try {
      const authors = await Author.find({}).lean().exec();
      return res.status(200).send({ authors:authors });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  });
  
  app.post("/authors", async (req, res) => {
    try {
      const author = await Author.create(req.body);
      return res.status(201).send(author);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  });

//   Checkout Schema

const checkoutScheama = new mongoose.Schema({
    bookId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "book",
            required: true,
    },
    checkIn :{type: Date },
    checkOut :{type:Date}
},{
    versionKey:false,
})
const Checkout = mongoose.model("checkout",checkoutScheama)

// Checkout CRUD

app.get("/checks", async (req, res) => {
    try {
      const checks = await Checkout.find({}).populate("bookId").lean().exec();
      return res.status(200).send({ checks:checks });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  });
  
  app.post("/checks", async (req, res) => {
    try {
      const check = await Checkout.create(req.body);
      return res.status(201).send(check);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  });

/*-------------- Query-------------------*/

app.get("/:authorId/books", async(req,res)=>{
    try {
        const books = await Book.find({author_Id: req.params.authorId}).lean().exec();
        return res.status(200).send(books);
    } catch (error) {
        return res.status(500).send({message:error.message})
    }
})

app.get("/books/:sectionId", async (req,res)=>{
    try {
        const books = await Book.find({section_id: req.params.sectionId}).lean().exec()
        return res.status(200).send(books)
    } catch (error) {
        return res.status(500).send({message:error.message})
    }
})

app.get("/books/:authorId/:sectionId", async(req,res)=>{
    try {
        const books = await Book.find({author_id : req.params.authorId,section_id : req.params.sectionId}).lean().exec()
        return res.status(200).send(books);
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
})

app.get("/checks/checkout",async (req,res)=>{
    try {
        const books = await Checkout.find({}).lean().exec()
        books.forEach((el)=>{
            if(el.checkOut!=null){
                  res.status(200).send(el);
                console.log(el)
            }
        })
    } catch (error) {
        return res.status(500).send({message:error.message})
    }
})

app.listen(5555, async () => {
  try {
    await connect();
    console.log("Listening on port 5500");
  } catch (error) {
    console.log("error:", error);
  }
});