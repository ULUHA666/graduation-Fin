// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getStorage, ref as storageRef, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

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
const database = getDatabase(app);
const storage = getStorage(app);

// ログイン状態の確認
onAuthStateChanged(auth, (user) => {
  if (user) {
    // ユーザーがログインしている場合
    const userId = user.uid;
    
    // ユーザー情報をデータベースから取得して表示する
    const userRef = ref(database, 'users/' + userId);
    onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      if (userData) {
        document.getElementById('user-email').textContent = userData.email;
        document.getElementById('user-name').textContent = userData.name;
        document.getElementById('user-address').textContent = userData.address;
        
        // プロフィール画像を表示する
        if (userData.profilePicture) {
          const profilePicRef = storageRef(storage, userData.profilePicture);
          getDownloadURL(profilePicRef)
            .then((url) => {
              document.getElementById('user-profile-picture').src = url;
            })
            .catch((error) => {
              console.error('プロフィール画像の読み込みエラー', error);
            });
        }
      }
    });
  } else {
    // ユーザーがログインしていない場合、ログイン画面にリダイレクトなどの処理を追加することもできます
    console.log('ログインしていません');
  }
});

// 情報修正ボタンのクリックイベントを追加する
const editProfileButton = document.getElementById('edit-profile-button');
editProfileButton.addEventListener('click', () => {
  // 修正画面に遷移するなどの処理を追加する
  window.location.href = "edit-profile.html";
});

// ログアウトボタンのクリックイベントを追加する
const logoutButton = document.getElementById('logout-button');
logoutButton.addEventListener('click', () => {
  auth.signOut().then(() => {
    console.log('ログアウトしました');
    // ログアウト後の処理を追加する（例：ログインページにリダイレクト）
    window.location.href = "login.html";
  }).catch((error) => {
    console.error('ログアウトエラー', error);
  });
});
