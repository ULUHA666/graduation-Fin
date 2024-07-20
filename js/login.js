import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Firebase SDKの設定情報を貼り付ける
const firebaseConfig = {
  apiKey: "AIzaSyDP7A2GI2XuDInBpA5vu3yDQ4rkFZGM80o",
  authDomain: "graduation1-ba2e0.firebaseapp.com",
  databaseURL: "https://graduation1-ba2e0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "graduation1-ba2e0",
  storageBucket: "graduation1-ba2e0.appspot.com",
  messagingSenderId: "812807619843",
  appId: "1:812807619843:web:fbf8a05c7d92ca9cf0d536",
  measurementId: "G-MVH6M1D80K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ログイン関数
function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      document.getElementById('message').innerText = 'ログインに成功しました！';
      // ログイン成功後にリダイレクトする
      window.location.href = "dashboard.html"; // ログイン後のリダイレクト先を指定
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      document.getElementById('message').innerText = 'エラー: ' + errorMessage;
    });
}

// ログインボタンにイベントリスナーを設定
document.getElementById('login-button').addEventListener('click', login);
