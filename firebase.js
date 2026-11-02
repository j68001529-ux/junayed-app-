import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyC35PyEUVJ9wzi61EOceL99rCXtnyJiDu0",
    authDomain: "junayed-app.firebaseapp.com",
    projectId: "junayed-app",
    storageBucket: "junayed-app.firebasestorage.app",
    messagingSenderId: "1027878479187",
    appId: "1:1027878479187:web:141c1fa558e1471204ada6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);