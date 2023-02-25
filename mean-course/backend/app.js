//this is a express file node.js server file taking express features

const express = require('express');

// handling a request for a single op
// storing the express import in a constant
const app = express();

// now we're going to make a funnel for this express request, where each part of the funnel does something different

// send a response with a middleware
// this use middle ware takes a function
// it takes request and response just like the node.js basic server did, and in addition the next function
app.use((req, res, next) => {
  console.log('first middleware');
  next(); //this will make the request travel down the file reaching other middlewares
});

app.use('/api/posts', (req, res, next) => {
  const posts = [
    { id: '1', title: 'First server-side post', content: 'This is coming from the server' },
    { id: '2', title: 'Second server-side post', content: 'This is coming from the server!' }
  ]
  //200 is sucess
  res.json({
    message: 'Posts fetched succesfully!',
    posts: posts
  });
});

//now we want to export this app to the node.js server in root folder

// instead of using export keyword, we will use module object that has an exports object
module.exports = app;

//now we import in the server.js
