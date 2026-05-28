/* VIDEO GRID */

const videoGrid =
  document.getElementById(
    "videoGrid"
  );

/* CHAT */

const messages =
  document.getElementById(
    "messages"
  );

const messageInput =
  document.getElementById(
    "messageInput"
  );

const sendBtn =
  document.getElementById(
    "sendBtn"
  );

/* CREATE VIDEO */

function createVideoCard(
  socketId,
  username = "User"
) {

  if (
    document.getElementById(
      "box_" + socketId
    )
  ) {
    return;
  }

  const box =
    document.createElement(
      "div"
    );

  box.className =
    "videoBox";

  box.id =
    "box_" + socketId;

  box.innerHTML = `
    <video
      id="video_${socketId}"
      autoplay
      playsinline
    ></video>

    <div class="videoOverlay">

      <div class="nameTag">
        ${username}
      </div>

      <div class="videoActions">

        <button class="miniBtn">
          🎤
        </button>

        <button class="miniBtn">
          📷
        </button>

      </div>

    </div>
  `;

  videoGrid.appendChild(
    box
  );

  updateVideoLayout();

}

/* REMOVE VIDEO */

function removeVideoCard(
  socketId
) {

  const element =
    document.getElementById(
      "box_" + socketId
    );

  if (element) {

    element.remove();

  }

  updateVideoLayout();

}

/* LAYOUT */

function updateVideoLayout() {

  const total =
    document.querySelectorAll(
      ".videoBox"
    ).length;

  if (total <= 2) {

    videoGrid.style.gridTemplateColumns =
      "1fr 1fr";

  } else if (
    total <= 4
  ) {

    videoGrid.style.gridTemplateColumns =
      "1fr 1fr";

  } else {

    videoGrid.style.gridTemplateColumns =
      "repeat(auto-fit,minmax(300px,1fr))";

  }

}

/* MESSAGE */

function addMessage(
  username,
  text,
  time = ""
) {

  const div =
    document.createElement(
      "div"
    );

  const self =
    username ===
    window.username;

  div.className =
    self
      ? "message self"
      : "message other";

  div.innerHTML = `
    <strong>${username}</strong>
    <br>
    ${text}

    <div
      style="
        opacity:.6;
        font-size:12px;
        margin-top:6px;
      "
    >
      ${time}
    </div>
  `;

  messages.appendChild(
    div
  );

  messages.scrollTop =
    messages.scrollHeight;

}

/* SYSTEM */

function showSystemMessage(
  text
) {

  const div =
    document.createElement(
      "div"
    );

  div.className =
    "systemMessage";

  div.innerText =
    text;

  messages.appendChild(
    div
  );

  messages.scrollTop =
    messages.scrollHeight;

}

/* COUNTS */

function updateParticipantCount(
  count
) {

  const element =
    document.getElementById(
      "participantCount"
    );

  if (!element) return;

  element.innerText =
    count +
    (
      count === 1
        ? " participant"
        : " participants"
    );

}

function updateOnlineCount(
  count
) {

  const element =
    document.getElementById(
      "onlineCount"
    );

  if (!element) return;

  element.innerText =
    count +
    " online";

}

/* REACTION */

function showReaction(
  username,
  emoji
) {

  showNotification(
    username +
    ": " +
    emoji
  );

}

/* NOTIFICATION */

function showNotification(
  text
) {

  const notif =
    document.createElement(
      "div"
    );

  notif.innerText =
    text;

  notif.style.position =
    "fixed";

  notif.style.top =
    "20px";

  notif.style.right =
    "20px";

  notif.style.padding =
    "14px 18px";

  notif.style.borderRadius =
    "16px";

  notif.style.background =
    "rgba(20,20,25,.92)";

  notif.style.border =
    "1px solid rgba(255,255,255,.08)";

  notif.style.backdropFilter =
    "blur(10px)";

  notif.style.zIndex =
    "99999";

  document.body.appendChild(
    notif
  );

  setTimeout(() => {

    notif.remove();

  }, 3000);

}

/* SPEAKING */

function setSpeaking(
  socketId,
  speaking = true
) {

  const box =
    document.getElementById(
      "box_" + socketId
    );

  if (!box) return;

  if (speaking) {

    box.classList.add(
      "speaking"
    );

  } else {

    box.classList.remove(
      "speaking"
    );

  }

}

/* SEND MESSAGE */

function sendMessage() {

  const text =
    messageInput.value.trim();

  if (!text) return;

  socket.emit(
    "send-message",
    text
  );

  messageInput.value =
    "";

  socket.emit(
    "typing",
    false
  );

}

/* SEND BUTTON */

sendBtn.onclick =
  sendMessage;

/* ENTER */

messageInput.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Enter"
    ) {

      sendMessage();

    }

  }
);

/* TYPING */

let typingTimeout;

messageInput.addEventListener(
  "input",
  () => {

    socket.emit(
      "typing",
      true
    );

    clearTimeout(
      typingTimeout
    );

    typingTimeout =
      setTimeout(
        () => {

          socket.emit(
            "typing",
            false
          );

        },
        1200
      );

  }
);
