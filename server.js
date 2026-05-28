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

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

/* ROOMS */

const rooms = {};

/*
rooms = {
  roomId: [
    {
      socketId,
      username
    }
  ]
}
*/

io.on("connection", socket => {

  console.log(
    "User connected:",
    socket.id
  );

  let currentRoom = null;

  let currentUsername = null;

  /* JOIN ROOM */

  socket.on("join-room", data => {

    const {
      roomId,
      username
    } = data;

    currentRoom = roomId;

    currentUsername = username;

    socket.join(roomId);

    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }

    rooms[roomId].push({
      socketId: socket.id,
      username
    });

    console.log(
      username +
      " joined room " +
      roomId
    );

    /* SEND USERS TO NEW USER */

    const otherUsers =
      rooms[roomId]
        .filter(
          user =>
            user.socketId !== socket.id
        );

    socket.emit(
      "all-users",
      otherUsers
    );

    /* TELL OTHERS */

    socket.to(roomId).emit(
      "user-joined",
      {
        socketId: socket.id,
        username
      }
    );

    /* UPDATE COUNTS */

    io.to(roomId).emit(
      "room-users",
      rooms[roomId]
    );

  });

  /* OFFER */

  socket.on(
    "offer",
    payload => {

      io.to(payload.target).emit(
        "offer",
        {
          sdp: payload.sdp,
          caller: socket.id,
          username: currentUsername
        }
      );

    }
  );

  /* ANSWER */

  socket.on(
    "answer",
    payload => {

      io.to(payload.target).emit(
        "answer",
        {
          sdp: payload.sdp,
          responder: socket.id
        }
      );

    }
  );

  /* ICE */

  socket.on(
    "ice-candidate",
    payload => {

      io.to(payload.target).emit(
        "ice-candidate",
        {
          candidate:
            payload.candidate,
          from: socket.id
        }
      );

    }
  );

  /* CHAT */

  socket.on(
    "send-message",
    message => {

      if (!currentRoom) return;

      io.to(currentRoom).emit(
        "new-message",
        {
          username:
            currentUsername,
          text: message,
          time:
            new Date()
              .toLocaleTimeString()
        }
      );

    }
  );

  /* TYPING */

  socket.on(
    "typing",
    isTyping => {

      if (!currentRoom) return;

      socket.to(currentRoom).emit(
        "user-typing",
        {
          username:
            currentUsername,
          isTyping
        }
      );

    }
  );

  /* REACTIONS */

  socket.on(
    "reaction",
    emoji => {

      if (!currentRoom) return;

      io.to(currentRoom).emit(
        "reaction",
        {
          username:
            currentUsername,
          emoji
        }
      );

    }
  );

  /* DISCONNECT */

  socket.on("disconnect", () => {

    console.log(
      "Disconnected:",
      socket.id
    );

    if (
      currentRoom &&
      rooms[currentRoom]
    ) {

      rooms[currentRoom] =
        rooms[currentRoom]
          .filter(
            user =>
              user.socketId !== socket.id
          );

      socket.to(currentRoom).emit(
        "user-left",
        {
          socketId: socket.id,
          username: currentUsername
        }
      );

      io.to(currentRoom).emit(
        "room-users",
        rooms[currentRoom]
      );

      /* DELETE EMPTY ROOM */

      if (
        rooms[currentRoom]
          .length === 0
      ) {

        delete rooms[currentRoom];

        console.log(
          "Deleted empty room:",
          currentRoom
        );

      }

    }

  });

});

/* START */

const PORT =
  process.env.PORT || 3001;

server.listen(PORT, () => {

  console.log(
    "Call4me server running on port",
    PORT
  );

});