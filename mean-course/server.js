// this single js file will be our whole server
// this can be executed with nodejs in the CLI by node server.js


//this current version of the code includes error handlers
const app = require("./backend/app");
const debug = require("debug")("node-angular");
const http = require("http");

// its a function that makes sure that when we try to set a port, and receive it through env variables, make sure its a valid number
const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

// a function that checks which type of error occured
const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//a function that outputs log that listening is happening
const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

//setting up a port by calling the first function of this code
const port = normalizePort(process.env.PORT || "3000"); //he used a string because usually the vallue on process.env.PORT is a string
app.set("port", port);

//setup node server
//registered two listeners, error and listening
//start the server
const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);




// this is the file without error handling, there's also the base server without express
// this is the nodejs import syntax
// const http = require('http');
// const app = require('./backend/app')

// //http package has this method, executes for every incoming request, and we're storing it in a constant 'server'. Constants are like variables, so  you store on one because his will never be changed
// const port = process.env.PORT || 3000;

// //port is a reserved key, this one takes the above port contant
// app.set('port', port);

// //we're creating a server using the express app, that was stored in the app variable above
// const server = http.createServer(app);

// //add the listener
// server.listen(port);

// //This is creating the server, essentially, before adding express
// // const server = http.createServer((req, res) => { //request, response
// //   res.end('This is my first response'); //ends writing to response stream
// // });

// //pass a port, 3000 is the developing port. During production you will pass an enviornment variable PORT.
// // server.listen(process.env.PORT || 3000);

// //this by itself allows the server to listen to requests and not quit by itself
// //if you change something in the serverside file, you need to restart the server
