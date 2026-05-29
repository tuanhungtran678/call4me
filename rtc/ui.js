/* =========================================
   CALL4ME — UI SYSTEM
========================================= */

/* =========================================
   ELEMENTS
========================================= */

const roomIdText =
  document.getElementById(
    "roomId"
  );

const copyRoomBtn =
  document.getElementById(
    "copyRoomBtn"
  );

const leaveBtn =
  document.getElementById(
    "leaveBtn"
  );

const participantCount =
  document.getElementById(
    "participantCount"
  );

const toggleMicBtn =
  document.getElementById(
    "toggleMicBtn"
  );

const toggleCameraBtn =
  document.getElementById(
    "toggleCameraBtn"
  );

const screenShareBtn =
  document.getElementById(
    "screenShareBtn"
  );

const reactionBtn =
  document.getElementById(
    "reactionBtn"
  );

const chatToggleBtn =
  document.getElementById(
    "chatToggleBtn"
  );

const chatInput =
  document.getElementById(
    "chatInput"
  );

const sendBtn =
  document.getElementById(
    "sendBtn"
  );

const chatMessages =
  document.getElementById(
    "chatMessages"
  );

const typingIndicator =
  document.getElementById(
    "typingIndicator"
  );

const reactionContainer =
  document.getElementById(
    "reactionContainer"
  );

const participantsList =
  document.getElementById(
    "participantsList"
  );

/* =========================================
   ROOM
========================================= */

const roomId =
  location.hash.replace(
    "#",
    ""
  ) || "public-room";

roomIdText.innerText =
  roomId;

/* =========================================
   STATES
========================================= */

let micEnabled = true;
let cameraEnabled = true;
let isTyping = false;

/* =========================================
   SOUNDS
========================================= */

const sounds = {

  click:
    new Audio(
      "https://actions.google.com/sounds/v1/cartoon/pop.ogg"
    ),

  join:
    new Audio(
      "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg"
    ),

  message:
    new Audio(
      "https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg"
    )

};

function playSound(
  sound
) {

  if (
    !sounds[sound]
  ) return;

  sounds[sound].currentTime =
    0;

  sounds[sound]
    .play()

    .catch(
      () => {}
    );

}

/* =========================================
   COPY ROOM
========================================= */

copyRoomBtn.onclick =
  async () => {

    await navigator
      .clipboard
      .writeText(
        location.href
      );

    copyRoomBtn.innerText =
      "✅ Copied";

    playSound(
      "click"
    );

    setTimeout(
      () => {

        copyRoomBtn.innerText =
          "📋 Copy Room";

      },

      2000
    );

  };

/* =========================================
   LEAVE ROOM
========================================= */

leaveBtn.onclick =
  () => {

    playSound(
      "click"
    );

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
        fill:"forwards"
      }

    );

    setTimeout(
      () => {

        location.href =
          "./home-screen/home.html";

      },

      450
    );

  };

/* =========================================
   MIC
========================================= */

toggleMicBtn.onclick =
  () => {

    micEnabled =
      !micEnabled;

    toggleMicBtn.innerText =
      micEnabled
        ? "🎤"
        : "🔇";

    toggleMicBtn.classList.toggle(
      "active",
      micEnabled
    );

    pulseButton(
      toggleMicBtn
    );

    playSound(
      "click"
    );

  };

/* =========================================
   CAMERA
========================================= */

toggleCameraBtn.onclick =
  () => {

    cameraEnabled =
      !cameraEnabled;

    toggleCameraBtn.innerText =
      cameraEnabled
        ? "📷"
        : "🚫";

    toggleCameraBtn.classList.toggle(
      "active",
      cameraEnabled
    );

    pulseButton(
      toggleCameraBtn
    );

    playSound(
      "click"
    );

  };

/* =========================================
   SCREEN SHARE
========================================= */

screenShareBtn.onclick =
  async () => {

    pulseButton(
      screenShareBtn
    );

    screenShareBtn.classList.toggle(
      "active"
    );

    playSound(
      "click"
    );

    try {

      await navigator
        .mediaDevices
        .getDisplayMedia({
          video:true
        });

      showNotification(
        "🖥️ Screen sharing started"
      );

    } catch {

      showNotification(
        "❌ Screen sharing cancelled"
      );

    }

  };

/* =========================================
   REACTIONS
========================================= */

const reactions =
  [
    "🔥",
    "😂",
    "🎉",
    "😎",
    "🚀",
    "💀",
    "❤️",
    "👏"
  ];

reactionBtn.onclick =
  () => {

    const emoji =
      reactions[
        Math.floor(
          Math.random() *
          reactions.length
        )
      ];

    spawnReaction(
      emoji
    );

    addSystemMessage(
      `Reaction sent ${emoji}`
    );

    playSound(
      "click"
    );

  };

function spawnReaction(
  emoji
) {

  const div =
    document.createElement(
      "div"
    );

  div.className =
    "reaction";

  div.innerText =
    emoji;

  div.style.left =
    Math.random() *
    90 +
    "%";

  reactionContainer
    .appendChild(
      div
    );

  setTimeout(
    () => {

      div.remove();

    },

    4000
  );

}

/* =========================================
   CHAT
========================================= */

sendBtn.onclick =
  sendMessage;

chatInput.addEventListener(
  "keydown",

  event => {

    if (
      event.key ===
      "Enter"
    ) {

      sendMessage();

    }

  }
);

chatInput.addEventListener(
  "input",

  () => {

    if (
      !isTyping
    ) {

      isTyping =
        true;

      typingIndicator.style.opacity =
        1;

      setTimeout(
        () => {

          isTyping =
            false;

          typingIndicator.style.opacity =
            0;

        },

        1400
      );

    }

  }
);

function sendMessage() {

  const message =
    chatInput.value.trim();

  if (!message)
    return;

  const div =
    document.createElement(
      "div"
    );

  div.className =
    "chatMessage self";

  div.innerHTML =
    `
    <div class="chatAvatar">
      😎
    </div>

    <div class="chatBubble">
      ${message}
    </div>
    `;

  chatMessages.appendChild(
    div
  );

  autoScrollChat();

  chatInput.value =
    "";

  playSound(
    "message"
  );

}

/* =========================================
   AUTO SCROLL
========================================= */

function autoScrollChat() {

  chatMessages.scrollTop =
    chatMessages.scrollHeight;

}

/* =========================================
   NOTIFICATIONS
========================================= */

function showNotification(
  text
) {

  const div =
    document.createElement(
      "div"
    );

  div.style.position =
    "fixed";

  div.style.top =
    "24px";

  div.style.left =
    "50%";

  div.style.transform =
    "translateX(-50%)";

  div.style.padding =
    "14px 20px";

  div.style.borderRadius =
    "18px";

  div.style.background =
    "rgba(0,0,0,.65)";

  div.style.backdropFilter =
    "blur(18px)";

  div.style.zIndex =
    "9999";

  div.style.fontWeight =
    "700";

  div.style.animation =
    "glowPulse 2s infinite";

  div.innerText =
    text;

  document.body
    .appendChild(
      div
    );

  setTimeout(
    () => {

      div.remove();

    },

    2500
  );

}

/* =========================================
   BUTTON PULSE
========================================= */

function pulseButton(
  button
) {

  button.animate(

    [
      {
        transform:
          "scale(1)"
      },

      {
        transform:
          "scale(1.18)"
      },

      {
        transform:
          "scale(1)"
      }

    ],

    {
      duration:260
    }

  );

}

/* =========================================
   PARTICIPANTS
========================================= */

const fakeParticipants =
  [
    "DevUser",
    "GamingPro",
    "MusicLover",
    "WebRTC Master"
  ];

fakeParticipants.forEach(
  (
    user,
    index
  ) => {

    setTimeout(
      () => {

        addParticipant(
          user
        );

      },

      index * 900
    );

  }
);

function addParticipant(
  name
) {

  const div =
    document.createElement(
      "div"
    );

  div.className =
    "participantCard";

  div.innerHTML =
    `
    <div class="participantAvatar">
      😎
    </div>

    <div class="participantMeta">

      <div class="participantName">
        ${name}
      </div>

      <div class="participantStatus">
        Connected
      </div>

    </div>
    `;

  participantsList.appendChild(
    div
  );

  participantCount.innerText =
    participantsList.children
      .length;

  showNotification(
    `👋 ${name} joined`
  );

  playSound(
    "join"
  );

}

/* =========================================
   CHAT TOGGLE
========================================= */

chatToggleBtn.onclick =
  () => {

    document
      .querySelector(
        ".chatPanel"
      )

      .classList.toggle(
        "hidden"
      );

    playSound(
      "click"
    );

  };

/* =========================================
   KEYBOARD SHORTCUTS
========================================= */

document.addEventListener(
  "keydown",

  event => {

    if (
      event.target.tagName ===
      "INPUT"
    ) return;

    switch (
      event.key.toLowerCase()
    ) {

      case "m":

        toggleMicBtn.click();

        break;

      case "v":

        toggleCameraBtn.click();

        break;

      case "r":

        reactionBtn.click();

        break;

      case "f":

        if (
          document.fullscreenElement
        ) {

          document.exitFullscreen();

        } else {

          document.documentElement
            .requestFullscreen();

        }

        break;

    }

  }
);

/* =========================================
   SYSTEM MESSAGE
========================================= */

function addSystemMessage(
  text
) {

  const div =
    document.createElement(
      "div"
    );

  div.className =
    "chatMessage";

  div.innerHTML =
    `
    <div class="chatAvatar">
      ⚡
    </div>

    <div class="chatBubble">
      ${text}
    </div>
    `;

  chatMessages.appendChild(
    div
  );

  autoScrollChat();

}

/* =========================================
   INIT
========================================= */

showNotification(
  "🚀 Connected to room"
);

typingIndicator.style.opacity =
  0;