const express = require('express');
const path = require('path');

const messenger = require('socket.io')();

const app = express();

app.use(express.static("public"));

const port = process.env.PORT || 5050;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/chat", (req, res) => {
  res.sendFile(path.join(__dirname, "chat.html"));
});

const server = app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

// Switchboard op
messenger.attach(server);

// socket is the single connection
messenger.on('connection', (socket) => {
  console.log(`A user connected: ${socket.id}`);

  socket.emit('connected', { sID: `${socket.id}`, message: 'new connection'})

  socket.on('chatMsg', function(msg){
    messenger.emit('message'), { id: socket.id, message: msg }
  });
  
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});