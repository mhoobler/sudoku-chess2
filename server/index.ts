import express from 'express';
import path from 'path';
import http from 'http';
import parser from 'body-parser';

import SocketHandler from './socket';

// Server and Sockets
const PORT = process.env.PORT || 3002;
const app = express();
const server = http.createServer(app);
const io = new SocketHandler(server);

// Database
import mongoose from 'mongoose';

const mongoSettings = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/sudoku-chess2", mongoSettings)
.then( res => console.log('connected to DB') )
.catch( err => console.log(err) );

// Middleware
app.use( parser.json({ limit: '50mb' }) )

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    // Although this references the build folder... Use the public folder in client/public to publish images/css/any static file
  app.use(express.static("client/build"));
  // client/public is the actual folder to use for static files
}

// You really only need API routes and not any HTML routes if you are using REACTJS as the frontend
// ******************************API ROUTES INCLUDED HERE***************************** //
app.get("/_api/non-cached", (req, res) => {
    res.json({ random: Math.random() });
});
app.get("/api/cached", (req, res) => {
    res.json({ random: Math.random() });
});

// Send every request to the React app
// Define any API routes before this runs
// will be broken in development...
app.get("*", function(req, res) {
  if (process.env.NODE_ENV === "production") {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  }
  else{
      // reminder
      res.json({"message": "Go to http://localhost:3000"});
  }
});

// socket(io);
// io.on('connection', (socket: Socket) => {
//   const id = socket.client.conn.id;
//   console.log(id);
// })


server.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
