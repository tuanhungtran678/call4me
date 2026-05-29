import {
  auth
}
from "../firebase/firebase.js";

import {
  onAuthStateChanged,
  signOut
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

/* =========================================
   ELEMENTS
========================================= */

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

/* =========================================
   AUTH CHECK
========================================= */

onAuthStateChanged(
  auth,

  user => {

    if (!user) {

      location.href =
        "../login.html";

      return;

    }

    usernameText.innerText =
      user.displayName ||
      "User";

    avatarImage.src =
      user.photoURL ||
      "https://ui-avatars.com/api/?name=User";

    startIntroAnimation();

  }
);

/* =========================================
   INTRO ANIMATION
========================================= */

function startIntroAnimation() {

  const animated =
    document.querySelectorAll(
      ".heroCard, .joinCard, .recentCard, .panelCard, .sidebar, .statCard, .activeRoomsCard, .activityCard"
    );

  animated.forEach(
    (
      element,
      index
    ) => {

      element.animate(

        [
          {
            opacity:0,
            transform:
              "translateY(30px) scale(.96)"
          },

          {
            opacity:1,
            transform:
              "translateY(0px) scale(1)"
          }

        ],

        {
          duration:700,
          delay:index * 120,
          easing:
            "cubic-bezier(.2,.8,.2,1)",
          fill:"forwards"
        }

      );

    }
  );

}

/* =========================================
   BACKGROUND PARALLAX
========================================= */

document.addEventListener(
  "mousemove",

  event => {

    const blobs =
      document.querySelectorAll(
        ".bgBlob"
      );

    const x =
      event.clientX /
      window.innerWidth;

    const y =
      event.clientY /
      window.innerHeight;

    blobs.forEach(
      (
        blob,
        index
      ) => {

        const moveX =
          (
            x - .5
          ) *
          (
            40 +
            index * 15
          );

        const moveY =
          (
            y - .5
          ) *
          (
            40 +
            index * 15
          );

        blob.style.transform =
          `
          translate(
            ${moveX}px,
            ${moveY}px
          )
          `;

      }
    );

  }
);

/* =========================================
   MAGNETIC BUTTONS
========================================= */

const buttons =
  document.querySelectorAll(
    "button"
  );

buttons.forEach(
  button => {

    button.addEventListener(
      "mousemove",

      event => {

        const rect =
          button.getBoundingClientRect();

        const x =
          event.clientX -
          rect.left;

        const y =
          event.clientY -
          rect.top;

        const moveX =
          (
            x -
            rect.width / 2
          ) / 10;

        const moveY =
          (
            y -
            rect.height / 2
          ) / 10;

        button.style.transform =
          `
          translate(
            ${moveX}px,
            ${moveY}px
          )
          scale(1.03)
          `;

      }
    );

    button.addEventListener(
      "mouseleave",

      () => {

        button.style.transform =
          "";

      }
    );

  }
);

/* =========================================
   ROOM FUNCTIONS
========================================= */

createRoomBtn.onclick =
  () => {

    const roomId =
      crypto.randomUUID();

    transitionToRoom(
      roomId
    );

  };

joinRoomBtn.onclick =
  () => {

    roomInput.focus();

  };

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

    shakeInput();

    return;

  }

  transitionToRoom(
    roomId
  );

}

/* =========================================
   SHAKE INPUT
========================================= */

function shakeInput() {

  roomInput.animate(

    [
      {
        transform:
          "translateX(0px)"
      },

      {
        transform:
          "translateX(-8px)"
      },

      {
        transform:
          "translateX(8px)"
      },

      {
        transform:
          "translateX(0px)"
      }

    ],

    {
      duration:300
    }

  );

}

/* =========================================
   PAGE TRANSITION
========================================= */

function transitionToRoom(
  roomId
) {

  document.body.animate(

    [
      {
        opacity:1,
        transform:
          "scale(1)"
      },

      {
        opacity:0,
        transform:
          "scale(1.03)"
      }

    ],

    {
      duration:500,
      fill:"forwards",
      easing:"ease"
    }

  );

  setTimeout(
    () => {

      location.href =
        `../index.html#${roomId}`;

    },

    450
  );

}

/* =========================================
   LOGOUT
========================================= */

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

/* =========================================
   MENU ACTIVE
========================================= */

document
  .querySelectorAll(
    ".menuBtn"
  )

  .forEach(
    btn => {

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

    }
  );

/* =========================================
   RECENT ROOM REJOIN
========================================= */

document
  .querySelectorAll(
    ".rejoinBtn"
  )

  .forEach(
    btn => {

      btn.onclick =
        () => {

          const roomId =
            crypto.randomUUID();

          transitionToRoom(
            roomId
          );

        };

    }
  );

/* =========================================
   LIVE CLOCK
========================================= */

const clock =
  document.createElement(
    "div"
  );

clock.style.position =
  "fixed";

clock.style.top =
  "18px";

clock.style.right =
  "24px";

clock.style.opacity =
  ".6";

clock.style.fontSize =
  "14px";

clock.style.zIndex =
  "999";

document.body.appendChild(
  clock
);

setInterval(
  () => {

    const now =
      new Date();

    clock.innerText =
      now.toLocaleTimeString();

  },

  1000
);

/* =========================================
   LIVE STATS
========================================= */

const onlineCount =
  document.getElementById(
    "onlineCount"
  );

const roomCount =
  document.getElementById(
    "roomCount"
  );

const callCount =
  document.getElementById(
    "callCount"
  );

animateCounter(
  onlineCount,
  128
);

animateCounter(
  roomCount,
  37
);

animateCounter(
  callCount,
  842
);

function animateCounter(
  element,
  target
) {

  if (!element) return;

  let current = 0;

  const interval =
    setInterval(
      () => {

        current +=
          Math.ceil(
            target / 40
          );

        if (
          current >= target
        ) {

          current =
            target;

          clearInterval(
            interval
          );

        }

        element.innerText =
          current;

      },

      30
    );

}

/* =========================================
   ACTIVE ROOMS
========================================= */

const activeRooms =
  [
    {
      name:
        "Design Team",
      users:8
    },

    {
      name:
        "Gaming Squad",
      users:14
    },

    {
      name:
        "Late Night Devs",
      users:6
    },

    {
      name:
        "Music Hangout",
      users:11
    }
  ];

const activeRoomsGrid =
  document.getElementById(
    "activeRoomsGrid"
  );

if (activeRoomsGrid) {

  activeRooms.forEach(
    room => {

      const card =
        document.createElement(
          "div"
        );

      card.className =
        "roomCard";

      card.innerHTML =
        `
        <div class="roomLive">
          LIVE
        </div>

        <div class="roomName">
          ${room.name}
        </div>

        <div class="roomUsers">
          👥 ${room.users} users
        </div>

        <button class="roomJoin">
          Join Room
        </button>
        `;

      card
        .querySelector(
          ".roomJoin"
        )

        .onclick =
          () => {

            const roomId =
              crypto.randomUUID();

            transitionToRoom(
              roomId
            );

          };

      activeRoomsGrid.appendChild(
        card
      );

    }
  );

}

/* =========================================
   ACTIVITY FEED
========================================= */

const activityFeed =
  document.getElementById(
    "activityFeed"
  );

const activities =
  [
    {
      icon:"🔥",
      text:
        "DevRoom joined by 4 users"
    },

    {
      icon:"🎤",
      text:
        "Music Hangout started"
    },

    {
      icon:"🚀",
      text:
        "New room created"
    },

    {
      icon:"💻",
      text:
        "WebRTC meeting active"
    },

    {
      icon:"👥",
      text:
        "12 users online"
    }
  ];

function addActivity() {

  if (!activityFeed)
    return;

  const activity =
    activities[
      Math.floor(
        Math.random() *
        activities.length
      )
    ];

  const item =
    document.createElement(
      "div"
    );

  item.className =
    "activityItem";

  item.innerHTML =
    `
    <div class="activityIcon">
      ${activity.icon}
    </div>

    <div class="activityText">
      ${activity.text}
    </div>

    <div class="activityTime">
      just now
    </div>
    `;

  activityFeed.prepend(
    item
  );

  if (
    activityFeed.children
      .length > 6
  ) {

    activityFeed.lastChild
      .remove();

  }

}

setInterval(
  addActivity,
  4000
);

for (
  let i = 0;
  i < 3;
  i++
) {

  addActivity();

}