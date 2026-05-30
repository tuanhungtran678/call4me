import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getAuth
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  getFirestore
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

/* FIREBASE CONFIG */

const firebaseConfig = {

  apiKey:
    "AIzaSyCEHYmJqVEBRUhulFDZGbgg6-B4eujtNRQ",

  authDomain:
    "call4me-7b71c.firebaseapp.com",

  projectId:
    "call4me-7b71c",

  storageBucket:
    "call4me-7b71c.firebasestorage.app",

  messagingSenderId:
    "914467007216",

  appId:
    "1:914467007216:web:7428f22334be1afae37035",

  measurementId:
    "G-P3R4YNVEFK"

};

/* INIT */

const app =
  initializeApp(
    firebaseConfig
  );

/* SERVICES */

export const auth =
  getAuth(app);

export const db =
  getFirestore(app);