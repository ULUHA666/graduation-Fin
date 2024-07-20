// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getStorage, ref as storageRef, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// Firebase SDKの設定情報を貼り付ける
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
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
