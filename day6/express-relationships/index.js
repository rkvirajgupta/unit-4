const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const connect = () => {
  return mongoose.connect(
    "mongodb+srv://virajgupta:Virajgupta12345@cluster0.wmplk.mongodb.net/relationships?retryWrites=true&w=majority"
  );
};

// USER SCHEMA
// Step 1 :- creating the schema
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true, // createdAt, updatedAt
  }
);

// Step 2 : creating the model   here user is a collection and iside it documents created by model
const User = mongoose.model("user", userSchema); // user => users

// POST SCHEMA
// Step 1 :- creating the schema
const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true, // createdAt, updatedAt
  }
);

// Step 2 :- creating the model
const Post = mongoose.model("post", postSchema); // post => posts

// COMMENT Schema
// Step 1 :- creating the schema
const commentSchema = new mongoose.Schema(
  {
    body: { type: String, required: true },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Step 2 :- creating the model
const Comment = mongoose.model("comment", commentSchema); // comment => comments

// CRUD OPERATIONS
// get => getting data from the server
// post => adding data to the server
// put / patch => updating data in the server
// delete => deleting data from the server

// USERS CRUD
app.get("/users", async (req, res) => {
  try {
    const users = await User.find().lean().exec();

    return res.status(200).send({ users: users }); // []
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Something went wrong .. try again later" });
  }
});

app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);

    return res.status(201).send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

// body => req.body
// url => req.params
// query string => req.query

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean().exec();
    // db.users.findOne({_id: Object('622893471b0065f917d24a38')})

    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

app.patch("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    // db.users.update({_id: Object('622893471b0065f917d24a38')}, {$set: {req.body}})

    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id).lean().exec();
    // db.users.deleteOne({_id: Object('622893471b0065f917d24a38')})

    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

// POSTS CRUD
app.get("/posts", async (req, res) => {
  try {
    // const posts = await Post.find().populate("userId").lean().exec();

    const posts = await Post.find()
/*.populate("userId")
// const post = db.posts.findOne({_id:Object("fdfdfd")})
//const user = db.users.findOne({_id:post.userId}).select({firstName:1,email:1,_id:0})
*/

    .populate({
     path: "userId",
    // select:["firstName","email"],
    select:{firstName:1,email:1,_id:0},
    })
    .lean().exec();


    return res.status(200).send(posts);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

app.post("/posts", async (req, res) => {
  try {
    const post = await Post.create(req.body);

    return res.status(200).send(post);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

app.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    .populate({path:"userId",select:["email"]})
    .lean().exec();

    return res.status(200).send(post);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

app.patch("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate({path:"userId",select:["firstName"]})
      .lean()
      .exec();

    return res.status(200).send(post);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id).lean().exec();

    return res.status(200).send(post);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

app.get("/posts/:postId/comments",async (req,res)=>{

try{
  const comments= await Comment.find({postId:req.params.postId}).lean().exec();
  return res.status(200).send(comments);
}
catch(err){
  return res.status(500).send({message:err.message});
}



})

//comments crud

app.get("/comments", async (req, res) => {
  try {
    const comments = await Comment.find()
    .populate({path:"postId",select:["title"],populate:{path:"userId",select:["firstName"]}})
    .populate({path:"userId",select:["firstName"]})
    
    .lean().exec();

    return res.status(200).send(comments);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

app.post("/comments", async (req, res) => {
  try {
    const comment = await Comment.create(req.body);

    return res.status(201).send(comment);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

app.get("/comments/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
    .populate({
     path:"postId",
     select:["title","body"],
     populate:{path:"userId",select:["password","firstName"]},
    })
    .populate({path:"userId",select:["firstName"]})
    .lean().exec();

    return res.status(201).send(comment);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

app.patch("/comments/:id", async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate({
      path:"postId",
      select:["title"],
      populate:{path:"userId",select:["firstName"]},
    }).populate({path:"userId",select:["email"]})
      .lean()
      .exec();

    return res.status(200).send(comment);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

app.delete("/comments/:id", async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id)
      .lean()
      .exec();

    return res.status(200).send(comment);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});
app.listen(5000, async () => {
  try {
    await connect();
  } catch (err) {
    console.log(err);
  }

  console.log("listening on port 5000");
});
