import {
  auth,
  db
}
from "./firebase.js";

import {
  GoogleAuthProvider,
  GithubAuthProvider,

  signInWithPopup,

  onAuthStateChanged,

  signOut
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  doc,
  setDoc,
  serverTimestamp
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

/* PROVIDERS */

const googleProvider =
  new GoogleAuthProvider();

const githubProvider =
  new GithubAuthProvider();

/* ELEMENTS */

const googleBtn =
  document.getElementById(
    "googleLogin"
  );

const githubBtn =
  document.getElementById(
    "githubLogin"
  );

const loadingText =
  document.getElementById(
    "loadingText"
  );

/* LOADING */

function setLoading(
  text = ""
) {

  loadingText.innerText =
    text;

}

/* SAVE USER */

async function saveUser(
  user
) {

  try {

    await setDoc(
      doc(
        db,
        "users",
        user.uid
      ),

      {
        uid:
          user.uid,

        username:
          user.displayName ||
          "User",

        email:
          user.email || "",

        avatar:
          user.photoURL || "",

        lastLogin:
          serverTimestamp()
      },

      {
        merge: true
      }
    );

  } catch (err) {

    console.error(
      "Save user error:",
      err
    );

  }

}

/* GOOGLE LOGIN */

googleBtn.onclick =
  async () => {

    try {

      setLoading(
        "Connecting to Google..."
      );

      const result =
        await signInWithPopup(
          auth,
          googleProvider
        );

      await saveUser(
        result.user
      );

      setLoading(
        "Login successful 🔥"
      );

      setTimeout(() => {

        location.href =
          "index.html";

      }, 1000);

    } catch (err) {

      console.error(err);

      setLoading(
        "Google login failed 😭"
      );

      alert(
        err.message
      );

    }

  };

/* GITHUB LOGIN */

githubBtn.onclick =
  async () => {

    try {

      setLoading(
        "Connecting to GitHub..."
      );

      const result =
        await signInWithPopup(
          auth,
          githubProvider
        );

      await saveUser(
        result.user
      );

      setLoading(
        "Login successful 🔥"
      );

      setTimeout(() => {

        location.href =
          "index.html";

      }, 1000);

    } catch (err) {

      console.error(err);

      setLoading(
        "GitHub login failed 😭"
      );

      alert(
        err.message
      );

    }

  };

/* AUTO LOGIN */

onAuthStateChanged(
  auth,

  user => {

    if (user) {

      setLoading(
        "Welcome back 🔥"
      );

      setTimeout(() => {

        location.href =
          "index.html";

      }, 800);

    } else {

      setLoading(
        ""
      );

    }

  }
);

/* LOGOUT */

window.logout =
  async () => {

    try {

      await signOut(
        auth
      );

      location.href =
        "login.html";

    } catch (err) {

      console.error(err);

    }

  };