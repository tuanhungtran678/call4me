import {
  auth
}
from "../firebase/firebase.js";

import {
  onAuthStateChanged,
  signOut
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

/* ELEMENTS */

const usernameText =
  document.getElementById(
    "username"
  );

const avatarImage =
  document.getElementById(
    "userAvatar"
  );

const logoutBtn =
  document.getElementById(
    "logoutBtn"
  );

const createRoomBtn =
  document.getElementById(
    "createRoomBtn"
  );

const joinRoomBtn =
  document.getElementById(
    "joinRoomBtn"
  );

const joinBtn =
  document.getElementById(
    "joinBtn"
  );

const roomInput =
  document.getElementById(
    "roomInput"
  );

/* AUTH CHECK */

onAuthStateChanged(
  auth,

  user => {

    if (!user) {

      location.href =
        "../login.html";

      return;

    }

    /* PROFILE */

    usernameText.innerText =
      user.displayName ||
      "User";

    avatarImage.src =
      user.photoURL ||
      "https://ui-avatars.com/api/?name=User";

  }
);

/* CREATE ROOM */

createRoomBtn.onclick =
  () => {

    const roomId =
      crypto.randomUUID();

    location.href =
      `../index.html#${roomId}`;

  };

/* QUICK JOIN */

joinRoomBtn.onclick =
  () => {

    roomInput.focus();

  };

/* JOIN ROOM */

joinBtn.onclick =
  joinRoom;

roomInput.addEventListener(
  "keydown",

  event => {

    if (
      event.key ===
      "Enter"
    ) {

      joinRoom();

    }

  }
);

function joinRoom() {

  const roomId =
    roomInput.value.trim();

  if (!roomId) {

    alert(
      "Enter room ID 😭"
    );

    return;

  }

  location.href =
    `../index.html#${roomId}`;

}

/* LOGOUT */

logoutBtn.onclick =
  async () => {

    try {

      await signOut(
        auth
      );

      location.href =
        "../login.html";

    } catch (err) {

      console.error(err);

      alert(
        "Logout failed 😭"
      );

    }

  };

/* MENU BUTTONS */

document
  .querySelectorAll(
    ".menuBtn"
  )

  .forEach(btn => {

    btn.addEventListener(
      "click",

      () => {

        document
          .querySelectorAll(
            ".menuBtn"
          )

          .forEach(
            b =>
              b.classList.remove(
                "active"
              )
          );

        btn.classList.add(
          "active"
        );

      }
    );

  });

/* RECENT REJOIN */

document
  .querySelectorAll(
    ".rejoinBtn"
  )

  .forEach(btn => {

    btn.onclick =
      () => {

        const roomId =
          crypto.randomUUID();

        location.href =
          `../index.html#${roomId}`;

      };

  });

/* FAKE ONLINE COUNT */

const onlineUsers =
  [
    "Hung",
    "DevUser",
    "WebRTC Master",
    "Socket Wizard",
    "Firebase Hero"
  ];

console.log(
  "Online users:",
  onlineUsers.length
);