const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "index.html")
  );
});

const server =
  http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", socket => {

  let currentRoom = null;

  socket.on("join-room", data => {

    const {
      roomId,
      username
    } = data;

    currentRoom = roomId;

    socket.join(roomId);

    socket.to(roomId).emit(
      "user-connected",
      username
    );

    console.log(
      username + " joined " + roomId
    );

  });

  socket.on("offer", (offer, roomId) => {
    socket.to(roomId).emit(
      "offer",
      offer
    );
  });

  socket.on("answer", (answer, roomId) => {
    socket.to(roomId).emit(
      "answer",
      answer
    );
  });

  socket.on(
    "ice-candidate",
    (candidate, roomId) => {

      socket.to(roomId).emit(
        "ice-candidate",
        candidate
      );

    }
  );

  socket.on("disconnect", () => {

    if (currentRoom) {

      socket
        .to(currentRoom)
        .emit("user-disconnected");

    }

  });

});

const PORT =
  process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(
    "Server running on port " + PORT
  );
});