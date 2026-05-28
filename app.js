/* ROOM */

let roomId =
  location.hash.substring(1);

if (!roomId) {

  roomId =
    crypto.randomUUID();

  location.hash =
    roomId;

}

/* USERNAME */

const username =
  localStorage.getItem(
    "username"
  ) ||
  prompt(
    "Tên của bạn"
  ) ||
  "Guest";

/* GLOBAL */

window.username =
  username;

/* SAVE */

localStorage.setItem(
  "username",
  username
);

/* UI */

document.getElementById(
  "roomText"
).innerText = roomId;

document.getElementById(
  "username"
).innerText = username;

/* BUTTONS */

const micBtn =
  document.getElementById(
    "micBtn"
  );

const camBtn =
  document.getElementById(
    "camBtn"
  );

const shareBtn =
  document.getElementById(
    "shareBtn"
  );

const leaveBtn =
  document.getElementById(
    "leaveBtn"
  );

/* START */

async function startApp() {

  await startMedia();

  joinRoom();

  showSystemMessage(
    "Joined room 🔥"
  );

}

/* MIC */

micBtn.onclick =
  () => {

    const enabled =
      toggleMic();

    micBtn.innerText =
      enabled
        ? "🎤"
        : "🔇";

  };

/* CAMERA */

camBtn.onclick =
  () => {

    const enabled =
      toggleCamera();

    camBtn.innerText =
      enabled
        ? "📷"
        : "🚫";

  };

/* SHARE */

shareBtn.onclick =
  async () => {

    await startScreenShare();

    showSystemMessage(
      "Screen sharing started 🖥️"
    );

  };

/* LEAVE */

leaveBtn.onclick =
  () => {

    location.reload();

  };

/* START APP */

startApp();