const configuration = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302"
    },
    {
      urls: "turn:openrelay.metered.ca:80",
      username: "openrelayproject",
      credential: "openrelayproject"
    }
  ]
};

let localStream;
let peerConnection;

async function startMedia() {
  localStream =
    await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });

  localVideo.srcObject = localStream;
}

function createPeer() {
  peerConnection =
    new RTCPeerConnection(configuration);

  localStream
    .getTracks()
    .forEach(track => {
      peerConnection.addTrack(
        track,
        localStream
      );
    });

  peerConnection.ontrack = event => {
    remoteVideo.srcObject =
      event.streams[0];
  };

  peerConnection.onicecandidate = event => {
    if (event.candidate) {
      socket.emit(
        "ice-candidate",
        event.candidate,
        roomId
      );
    }
  };
}

async function createOffer() {
  createPeer();

  const offer =
    await peerConnection.createOffer();

  await peerConnection.setLocalDescription(
    offer
  );

  socket.emit("offer", offer, roomId);
}

async function handleOffer(offer) {
  createPeer();

  await peerConnection.setRemoteDescription(
    offer
  );

  const answer =
    await peerConnection.createAnswer();

  await peerConnection.setLocalDescription(
    answer
  );

  socket.emit("answer", answer, roomId);
}

async function handleAnswer(answer) {
  await peerConnection.setRemoteDescription(
    answer
  );
}

async function handleCandidate(candidate) {
  try {
    await peerConnection.addIceCandidate(
      candidate
    );
  } catch (err) {
    console.error(err);
  }
}