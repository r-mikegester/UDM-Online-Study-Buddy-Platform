const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("joinRoom", (room) => {
    socket.join(room);
  });

  socket.on("chatMessage", (data) => {
    io.to(data.room).emit("chatMessage", data);
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

app.use(express.static('public')); // serve static files from /public

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});