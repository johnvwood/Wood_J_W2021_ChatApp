// Variables
const express = require('express');
const path = require('path');
const messenger = require('socket.io')();
const app = express();
const port = process.env.PORT || 5050;

const server = app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});


// App functions
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/chat", (req, res) => {
  res.sendFile(path.join(__dirname, "chat.html"));
});


// Messenger functions
messenger.attach(server);

messenger.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id}`);

  socket.emit("connected", { sID: `${socket.id}`, message: "new connection"});

  socket.on("chatMessage", function(msg) {
    console.log(msg);
    messenger.emit("message", {id: socket.id, message: msg});
  });
  
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});