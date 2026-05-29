/* =========================================
   SOCKET
========================================= */

export const socket =
  io();

/* =========================================
   ROOM
========================================= */

const roomId =
  location.hash.replace(
    "#",
    ""
  ) || "public-room";

/* =========================================
   USERNAME
========================================= */

const username =
  "User-" +
  Math.floor(
    Math.random() * 9999
  );

/* =========================================
   JOIN
========================================= */

socket.emit(
  "join-room",

  {
    roomId,
    username
  }
);

/* =========================================
   CHAT
========================================= */

export function sendChatMessage(
  message
) {

  socket.emit(
    "chat-message",

    {
      message
    }
  );

}

/* =========================================
   TYPING
========================================= */

export function sendTyping(
  state
) {

  socket.emit(
    "typing",
    state
  );

}

/* =========================================
   REACTIONS
========================================= */

export function sendReaction(
  emoji
) {

  socket.emit(
    "reaction",
    emoji
  );

}

/* =========================================
   SPEAKING
========================================= */

export function sendSpeaking(
  state
) {

  socket.emit(
    "speaking",
    state
  );

}

/* =========================================
   WEBRTC
========================================= */

export function sendOffer(
  offer
) {

  socket.emit(
    "offer",

    {
      roomId,
      offer
    }
  );

}

export function sendAnswer(
  answer
) {

  socket.emit(
    "answer",

    {
      roomId,
      answer
    }
  );

}

export function sendIceCandidate(
  candidate
) {

  socket.emit(
    "ice-candidate",

    {
      roomId,
      candidate
    }
  );

}

/* =========================================
   EVENTS
========================================= */

socket.on(
  "participants-update",

  users => {

    window.dispatchEvent(

      new CustomEvent(
        "participants-update",

        {
          detail:users
        }
      )

    );

  }
);

socket.on(
  "chat-message",

  data => {

    window.dispatchEvent(

      new CustomEvent(
        "chat-message",

        {
          detail:data
        }
      )

    );

  }
);

socket.on(
  "typing",

  data => {

    window.dispatchEvent(

      new CustomEvent(
        "typing",

        {
          detail:data
        }
      )

    );

  }
);

socket.on(
  "reaction",

  data => {

    window.dispatchEvent(

      new CustomEvent(
        "reaction",

        {
          detail:data
        }
      )

    );

  }
);

socket.on(
  "system-message",

  data => {

    window.dispatchEvent(

      new CustomEvent(
        "system-message",

        {
          detail:data
        }
      )

    );

  }
);

socket.on(
  "room-info",

  data => {

    window.dispatchEvent(

      new CustomEvent(
        "room-info",

        {
          detail:data
        }
      )

    );

  }
);

socket.on(
  "speaking",

  data => {

    window.dispatchEvent(

      new CustomEvent(
        "speaking",

        {
          detail:data
        }
      )

    );

  }
);

/* =========================================
   WEBRTC EVENTS
========================================= */

socket.on(
  "offer",

  data => {

    window.dispatchEvent(

      new CustomEvent(
        "offer",

        {
          detail:data
        }
      )

    );

  }
);

socket.on(
  "answer",

  data => {

    window.dispatchEvent(

      new CustomEvent(
        "answer",

        {
          detail:data
        }
      )

    );

  }
);

socket.on(
  "ice-candidate",

  data => {

    window.dispatchEvent(

      new CustomEvent(
        "ice-candidate",

        {
          detail:data
        }
      )

    );

  }
);