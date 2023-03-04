//this is a express file node.js server file taking express features

const express = require('express');
const bodyParser = require('body-parser'); //this is a node express package
const mongoose = require("mongoose");

const Post = require('./models/post');

// handling a request for a single op
// storing the express import in a constant
const app = express();
mongoose.connect("mongodb+srv://jihanger97:Tq7mNBkE6GIGqb9W@cluster0.65zj4io.mongodb.net/node-angular?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  })

// now we're going to make a funnel for this express request, where each part of the funnel does something different

// send a response with a middleware
// this use middle ware takes a function
// it takes request and response just like the node.js basic server did, and in addition the next function
app.use((req, res, next) => {
  console.log('first middleware');
  next(); //this will make the request travel down the file reaching other middlewares
});

app.use(bodyParser.json());
//you can also do other types of body suchs as:
app.use(bodyParser.urlencoded({ extended: false })); //this line can be commented out, it's not being used right now

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post("/api/posts", (req, res, next) => {
  //you're calling this from the models folder post.js, you gave its name as'Post'
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  }); //this object is being managed by mongoose, you can save the objects created here directly on monngoDB
  console.log(post);
  post.save().then( createdPost => {
    res.status(201).json({
      message: "Post added succesfully",
      postId: createdPost._id
    });
  }); //mongoose function, will create a collection called the same name as the model but plural

  // We dont use next() jere because res is already sending a response
  // sending a second response with next() would cause an error
});

app.get('/api/posts', (req, res, next) => {
  Post.find() //simply returns all entries, can be narrowed down
    .then(documents => {
      console.log(documents);
      res.status(200).json({
        message: 'Posts fetched succesfully!',
        posts: documents
      });
    });
  //200 is sucess

});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result)
  });
  res.status(200).json({ message: "Post deleted!" });
});

//now we want to export this app to the node.js server in root folder

// instead of using export keyword, we will use module object that has an exports object
module.exports = app;

//now we import in the server.js
