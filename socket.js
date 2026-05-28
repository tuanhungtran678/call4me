const socket = io();

/* SOCKET STATUS */

socket.on("connect", () => {

  console.log(
    "Connected:",
    socket.id
  );

  showSystemMessage(
    "Connected to server 🔥"
  );

});

socket.on("disconnect", () => {

  console.log(
    "Disconnected"
  );

  showSystemMessage(
    "Disconnected from server 💀"
  );

});

/* JOIN */

function joinRoom() {

  socket.emit(
    "join-room",
    {
      roomId,
      username
    }
  );

}

/* ALL USERS */

socket.on(
  "all-users",
  users => {

    console.log(
      "Users in room:",
      users
    );

    users.forEach(user => {

      createPeerConnection(
        user.socketId,
        true
      );

      createVideoCard(
        user.socketId,
        user.username
      );

    });

  }
);

/* USER JOINED */

socket.on(
  "user-joined",
  user => {

    console.log(
      "User joined:",
      user
    );

    showSystemMessage(
      user.username +
      " joined the room"
    );

    document
      .getElementById(
        "joinSound"
      )
      .play();

    createVideoCard(
      user.socketId,
      user.username
    );

  }
);

/* ROOM USERS */

socket.on(
  "room-users",
  users => {

    updateParticipantCount(
      users.length
    );

    updateOnlineCount(
      users.length
    );

  }
);

/* OFFER */

socket.on(
  "offer",
  async payload => {

    await handleOffer(
      payload
    );

  }
);

/* ANSWER */

socket.on(
  "answer",
  async payload => {

    await handleAnswer(
      payload
    );

  }
);

/* ICE */

socket.on(
  "ice-candidate",
  async payload => {

    await handleIceCandidate(
      payload
    );

  }
);

/* USER LEFT */

socket.on(
  "user-left",
  data => {

    console.log(
      "User left:",
      data
    );

    showSystemMessage(
      data.username +
      " left the room"
    );

    document
      .getElementById(
        "leaveSound"
      )
      .play();

    removeVideoCard(
      data.socketId
    );

    removePeer(
      data.socketId
    );

  }
);

/* CHAT */

socket.on(
  "new-message",
  data => {

    addMessage(
      data.username,
      data.text,
      data.time
    );

  }
);

/* TYPING */

socket.on(
  "user-typing",
  data => {

    const typingText =
      document.getElementById(
        "typingText"
      );

    if (data.isTyping) {

      typingText.innerText =
        data.username +
        " is typing...";

    } else {

      typingText.innerText =
        "";

    }

  }
);

/* REACTIONS */

socket.on(
  "reaction",
  data => {

    showReaction(
      data.username,
      data.emoji
    );

  }
);

/* RECONNECT */

socket.io.on(
  "reconnect",
  () => {

    console.log(
      "Reconnected"
    );

    showSystemMessage(
      "Reconnected 🔥"
    );

    joinRoom();

  }
);