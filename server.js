const express =
  require("express");

const http =
  require("http");

const {
  Server
} =
  require("socket.io");

const path =
  require("path");

/* =========================================
   APP
========================================= */

const app =
  express();

const server =
  http.createServer(
    app
  );

const io =
  new Server(
    server,
    {
      cors:{
        origin:"*"
      }
    }
  );

/* =========================================
   STATIC
========================================= */

app.use(
  express.static(
    __dirname
  )
);

app.get(
  "/",

  (req,res) => {

    res.sendFile(
      path.join(
        __dirname,
        "index.html"
      )
    );

  }
);

/* =========================================
   ROOMS
========================================= */

const rooms = {};

/* =========================================
   SOCKET
========================================= */

io.on(
  "connection",

  socket => {

    console.log(
      "⚡ Connected:",
      socket.id
    );

    /* =========================================
       JOIN ROOM
    ========================================= */

    socket.on(
      "join-room",

      ({
        roomId,
        username
      }) => {

        socket.join(
          roomId
        );

        socket.roomId =
          roomId;

        socket.username =
          username ||
          "Anonymous";

        /* CREATE ROOM */

        if (
          !rooms[roomId]
        ) {

          rooms[roomId] = {
            users:[]
          };

        }

        /* ADD USER */

        rooms[roomId]
          .users
          .push({

            id:socket.id,

            username:
              socket.username

          });

        /* SEND CURRENT USERS */

        io.to(roomId).emit(
          "participants-update",

          rooms[roomId]
            .users
        );

        /* JOIN MESSAGE */

        socket.to(roomId).emit(
          "system-message",

          {
            text:
              `👋 ${socket.username} joined`
          }
        );

        /* ROOM INFO */

        io.to(roomId).emit(
          "room-info",

          {
            roomId,

            count:
              rooms[roomId]
                .users.length
          }
        );

      }
    );

    /* =========================================
       CHAT
    ========================================= */

    socket.on(
      "chat-message",

      data => {

        if (
          !socket.roomId
        ) return;

        io.to(
          socket.roomId
        ).emit(
          "chat-message",

          {
            id:socket.id,

            username:
              socket.username,

            message:
              data.message

          }
        );

      }
    );

    /* =========================================
       TYPING
    ========================================= */

    socket.on(
      "typing",

      state => {

        socket.to(
          socket.roomId
        ).emit(
          "typing",

          {
            username:
              socket.username,

            state
          }
        );

      }
    );

    /* =========================================
       REACTIONS
    ========================================= */

    socket.on(
      "reaction",

      emoji => {

        io.to(
          socket.roomId
        ).emit(
          "reaction",

          {
            emoji,

            username:
              socket.username
          }
        );

      }
    );

    /* =========================================
       SPEAKING
    ========================================= */

    socket.on(
      "speaking",

      speaking => {

        socket.to(
          socket.roomId
        ).emit(
          "speaking",

          {
            id:socket.id,

            username:
              socket.username,

            speaking
          }
        );

      }
    );

    /* =========================================
       WEBRTC SIGNALING
    ========================================= */

    socket.on(
      "offer",

      data => {

        socket.to(
          data.roomId
        ).emit(
          "offer",

          data
        );

      }
    );

    socket.on(
      "answer",

      data => {

        socket.to(
          data.roomId
        ).emit(
          "answer",

          data
        );

      }
    );

    socket.on(
      "ice-candidate",

      data => {

        socket.to(
          data.roomId
        ).emit(
          "ice-candidate",

          data
        );

      }
    );

    /* =========================================
       DISCONNECT
    ========================================= */

    socket.on(
      "disconnect",

      () => {

        console.log(
          "❌ Disconnected:",
          socket.id
        );

        const roomId =
          socket.roomId;

        if (
          !roomId ||
          !rooms[roomId]
        ) return;

        /* REMOVE USER */

        rooms[roomId]
          .users =
          rooms[roomId]
            .users
            .filter(
              user =>
                user.id !==
                socket.id
            );

        /* UPDATE USERS */

        io.to(roomId).emit(
          "participants-update",

          rooms[roomId]
            .users
        );

        /* LEAVE MESSAGE */

        socket.to(roomId).emit(
          "system-message",

          {
            text:
              `👋 ${socket.username} left`
          }
        );

        /* ROOM INFO */

        io.to(roomId).emit(
          "room-info",

          {
            roomId,

            count:
              rooms[roomId]
                .users.length
          }
        );

        /* DELETE EMPTY ROOM */

        if (
          rooms[roomId]
            .users.length === 0
        ) {

          delete rooms[
            roomId
          ];

          console.log(
            "🗑️ Room deleted:",
            roomId
          );

        }

      }
    );

  }
);

/* =========================================
   START
========================================= */

const PORT =
  process.env.PORT ||
  3000;

server.listen(
  PORT,

  () => {

    console.log(
      `🚀 Server running on ${PORT}`
    );

  }
);