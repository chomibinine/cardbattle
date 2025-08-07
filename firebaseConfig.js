// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, onValue, remove } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBkDL4r-TwmNuUv5riVlNDeAnpibpcedPA",
  authDomain: "card-83d5a.firebaseapp.com",
  projectId: "card-83d5a",
  storageBucket: "card-83d5a.appspot.com",
  messagingSenderId: "83854808155",
  appId: "1:83854808155:web:7dc0e45d257118aa8b1b7e",
  measurementId: "G-N0579YMZFY"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export { db, ref, set, onValue, remove };
