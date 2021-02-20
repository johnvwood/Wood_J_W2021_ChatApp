// Variables
const path = require('path');
const express = require('express');
const app = express();

const io = require('socket.io')();
const port = process.env.PORT || 5050;

const server = app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

// App functions
app.use(express.static("public"));

app.get("/", (req, res) => {res.sendFile(path.join(__dirname, "index.html"));});

app.get("/chat", (req, res) => {res.sendFile(path.join(__dirname, "chat.html"));});


// Messenger functions
io.attach(server);

io.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id}`);
  socket.emit("connected", { sID: `${socket.id}`, message: "new connection"});

  socket.on("joinUser", (username) => {
    socket.username = username;
    console.log(`Someone chose username ${this.username}`)
  });

  socket.on("chatMessage", (msg) => {
    console.log(msg);
    io.emit("message", {id: socket.id, message: msg});
  });
  
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});