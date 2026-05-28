/* CONFIG */

const configuration = {
  iceServers: [
    {
      urls:
        "stun:stun.l.google.com:19302"
    },
    {
      urls:
        "turn:openrelay.metered.ca:80",
      username:
        "openrelayproject",
      credential:
        "openrelayproject"
    }
  ]
};

/* STREAMS */

let localStream = null;

/* PEERS */

const peers = {};

/*
peers = {
  socketId: RTCPeerConnection
}
*/

/* START MEDIA */

async function startMedia() {

  try {

    localStream =
      await navigator
        .mediaDevices
        .getUserMedia({
          video: true,
          audio: true
        });

    const localVideo =
      document.getElementById(
        "localVideo"
      );

    localVideo.srcObject =
      localStream;

    console.log(
      "Media started"
    );

  } catch (err) {

    console.error(err);

    alert(
      "Camera/Microphone access denied"
    );

  }

}

/* CREATE PEER */

async function createPeerConnection(
  targetId,
  initiator = false
) {

  if (peers[targetId]) {
    return peers[targetId];
  }

  const peer =
    new RTCPeerConnection(
      configuration
    );

  peers[targetId] = peer;

  /* ADD TRACKS */

  localStream
    .getTracks()
    .forEach(track => {

      peer.addTrack(
        track,
        localStream
      );

    });

  /* REMOTE STREAM */

  peer.ontrack = event => {

    const remoteVideo =
      document.getElementById(
        "video_" + targetId
      );

    if (remoteVideo) {

      remoteVideo.srcObject =
        event.streams[0];

    }

  };

  /* ICE */

  peer.onicecandidate =
    event => {

      if (
        event.candidate
      ) {

        socket.emit(
          "ice-candidate",
          {
            target:
              targetId,

            candidate:
              event.candidate
          }
        );

      }

    };

  /* CONNECTION STATE */

  peer.onconnectionstatechange =
    () => {

      console.log(
        targetId,
        peer.connectionState
      );

      if (
        peer.connectionState ===
        "disconnected"
      ) {

        removePeer(
          targetId
        );

        removeVideoCard(
          targetId
        );

      }

    };

  /* CREATE OFFER */

  if (initiator) {

    const offer =
      await peer.createOffer();

    await peer
      .setLocalDescription(
        offer
      );

    socket.emit(
      "offer",
      {
        target:
          targetId,

        sdp:
          peer.localDescription
      }
    );

  }

  return peer;

}

/* HANDLE OFFER */

async function handleOffer(
  payload
) {

  const {
    caller,
    sdp,
    username
  } = payload;

  createVideoCard(
    caller,
    username
  );

  const peer =
    await createPeerConnection(
      caller,
      false
    );

  await peer
    .setRemoteDescription(
      new RTCSessionDescription(
        sdp
      )
    );

  const answer =
    await peer.createAnswer();

  await peer
    .setLocalDescription(
      answer
    );

  socket.emit(
    "answer",
    {
      target:
        caller,

      sdp:
        peer.localDescription
    }
  );

}

/* HANDLE ANSWER */

async function handleAnswer(
  payload
) {

  const {
    responder,
    sdp
  } = payload;

  const peer =
    peers[responder];

  if (!peer) return;

  await peer
    .setRemoteDescription(
      new RTCSessionDescription(
        sdp
      )
    );

}

/* HANDLE ICE */

async function handleIceCandidate(
  payload
) {

  const {
    from,
    candidate
  } = payload;

  const peer =
    peers[from];

  if (!peer) return;

  try {

    await peer
      .addIceCandidate(
        new RTCIceCandidate(
          candidate
        )
      );

  } catch (err) {

    console.error(err);

  }

}

/* REMOVE PEER */

function removePeer(
  socketId
) {

  const peer =
    peers[socketId];

  if (!peer) return;

  peer.close();

  delete peers[socketId];

  console.log(
    "Removed peer:",
    socketId
  );

}

/* TOGGLE MIC */

function toggleMic() {

  if (!localStream) return;

  const track =
    localStream
      .getAudioTracks()[0];

  track.enabled =
    !track.enabled;

  return track.enabled;

}

/* TOGGLE CAMERA */

function toggleCamera() {

  if (!localStream) return;

  const track =
    localStream
      .getVideoTracks()[0];

  track.enabled =
    !track.enabled;

  return track.enabled;

}

/* SCREEN SHARE */

async function startScreenShare() {

  try {

    const screenStream =
      await navigator
        .mediaDevices
        .getDisplayMedia({
          video: true
        });

    const screenTrack =
      screenStream
        .getVideoTracks()[0];

    Object.values(
      peers
    ).forEach(peer => {

      const sender =
        peer
          .getSenders()
          .find(
            sender =>
              sender.track &&
              sender.track.kind ===
              "video"
          );

      if (sender) {

        sender.replaceTrack(
          screenTrack
        );

      }

    });

    screenTrack.onended =
      () => {

        const cameraTrack =
          localStream
            .getVideoTracks()[0];

        Object.values(
          peers
        ).forEach(peer => {

          const sender =
            peer
              .getSenders()
              .find(
                sender =>
                  sender.track &&
                  sender.track.kind ===
                  "video"
              );

          if (sender) {

            sender.replaceTrack(
              cameraTrack
            );

          }

        });

      };

  } catch (err) {

    console.error(err);

  }

}