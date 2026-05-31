import { auth } from "./firebase.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

/* ==========================
   ELEMENTS
========================== */

const avatar =
  document.getElementById(
    "userAvatar"
  );

const displayName =
  document.getElementById(
    "displayName"
  );

const email =
  document.getElementById(
    "email"
  );

const logoutBtn =
  document.getElementById(
    "logoutBtn"
  );

/* ==========================
   AUTH CHECK
========================== */

onAuthStateChanged(
  auth,

  user => {

    if (!user) {

      location.href =
        "../login.html";

      return;
    }

    avatar.src =
      user.photoURL ||
      "https://ui-avatars.com/api/?name=User";

    displayName.textContent =
      user.displayName ||
      "Unknown User";

    email.textContent =
      user.email ||
      "No Email";

  }
);

/* ==========================
   LOGOUT
========================== */

logoutBtn.onclick =
  async () => {

    try {

      await signOut(
        auth
      );

      location.href =
        "../login.html";

    }

    catch (error) {

      console.error(
        error
      );

      alert(
        "Logout failed!"
      );

    }

  };

document
  .getElementById("dialBtn")
  ?.addEventListener(
    "click",
    () => {
      location.href =
        "../dial/dial.html";
    }
  );

document
  .getElementById("friendsBtn")
  ?.addEventListener(
    "click",
    () => {
      location.href =
        "../friends/friends.html";
    }
  );

document
  .getElementById("messagesBtn")
  ?.addEventListener(
    "click",
    () => {
      location.href =
        "../messages/messages.html";
    }
  );

document
  .getElementById("callsBtn")
  ?.addEventListener(
    "click",
    () => {
      location.href =
        "../calls/calls.html";
    }
  );

document
  .getElementById("settingsBtn")
  ?.addEventListener(
    "click",
    () => {
      location.href =
        "../settings/settings.html";
    }
  );