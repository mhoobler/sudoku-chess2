import express from "express";
import path from "path";
import http from "http";
import parser from "body-parser";
import dotenv from "dotenv";

import SocketHandler from "./socket";

// Server and Sockets
const PORT = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app);
const io = new SocketHandler(server);

// Database
import mongoose from "mongoose";

const mongoSettings = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://localhost/sugokuChess2",
    mongoSettings
  )
  .then((res) => console.log("connected to DB"))
  .catch((err) => console.log(err));

// Middleware
app.use(parser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  // Although this references the build folder... Use the public folder in client/public to publish images/css/any static file
  app.use(express.static("./client/build"));
  // client/public is the actual folder to use for static files
} else {
  dotenv.config();
}

// Send every request to the React app
// Define any API routes before this runs
// will be broken in development...
app.get("/", function (req, res) {
  if (process.env.NODE_ENV === "production") {
    res.sendFile("./client/build/index.html", { root: __dirname });
  } else {
    // reminder
    res.json({ message: "Go to http://localhost:3000" });
  }
});

app.get("*", function (req, res) {
  res.json({ message: "404" });
});

// socket(io);
// io.on('connection', (socket: Socket) => {
//   const id = socket.client.conn.id;
//   console.log(id);
// })

server.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
