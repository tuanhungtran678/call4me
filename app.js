const socket = io();

const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");

const roomText = document.getElementById("roomText");
const usernameText = document.getElementById("username");

const micBtn = document.getElementById("micBtn");
const camBtn = document.getElementById("camBtn");
const shareBtn = document.getElementById("shareBtn");

let roomId = location.hash.substring(1);

if (!roomId) {
  roomId = crypto.randomUUID();

  location.hash = roomId;
}

roomText.innerText = roomId;

const username =
  localStorage.getItem("username") ||
  prompt("Tên của bạn") ||
  "Guest";

localStorage.setItem("username", username);

usernameText.innerText = username;

let micEnabled = true;
let camEnabled = true;

async function startApp() {
  await startMedia();

  socket.emit("join-room", {
    roomId,
    username
  });
}

micBtn.onclick = () => {
  micEnabled = !micEnabled;

  localStream.getAudioTracks()[0].enabled =
    micEnabled;

  micBtn.innerText = micEnabled ? "🎤" : "🔇";
};

camBtn.onclick = () => {
  camEnabled = !camEnabled;

  localStream.getVideoTracks()[0].enabled =
    camEnabled;

  camBtn.innerText = camEnabled ? "📷" : "🚫";
};

shareBtn.onclick = async () => {
  const screen =
    await navigator.mediaDevices.getDisplayMedia({
      video: true
    });

  const screenTrack =
    screen.getVideoTracks()[0];

  const sender =
    peerConnection
      .getSenders()
      .find(s =>
        s.track.kind === "video"
      );

  sender.replaceTrack(screenTrack);

  screenTrack.onended = () => {
    sender.replaceTrack(
      localStream.getVideoTracks()[0]
    );
  };
};

socket.on("user-connected", async () => {
  await createOffer();
});

socket.on("offer", async offer => {
  await handleOffer(offer);
});

socket.on("answer", async answer => {
  await handleAnswer(answer);
});

socket.on("ice-candidate", async candidate => {
  await handleCandidate(candidate);
});

socket.on("user-disconnected", () => {
  remoteVideo.srcObject = null;

  new Audio("sounds/leave.mp3").play();
});

startApp();