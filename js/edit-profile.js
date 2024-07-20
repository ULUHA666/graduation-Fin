// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

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
auth.onAuthStateChanged((user) => {
  if (user) {
    const userId = user.uid;
    const userRef = ref(database, 'users/' + userId);

    const editProfileForm = document.getElementById('edit-profile-form');
    const messageDiv = document.getElementById('message');

    editProfileForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = editProfileForm['email'].value;
      const name = editProfileForm['name'].value;
      const address = editProfileForm['address'].value;
      const profilePicture = editProfileForm['profile-picture'].files[0];

      try {
        // プロフィール画像のアップロード
        let profilePicUrl = '';
        if (profilePicture) {
          const profilePicRef = storageRef(storage, 'profilePictures/' + userId + '/' + profilePicture.name);
          await uploadBytes(profilePicRef, profilePicture);
          profilePicUrl = await getDownloadURL(profilePicRef);
        }

        // ユーザー情報の更新
        await set(userRef, {
          email: email,
          name: name,
          address: address,
          profilePicture: profilePicUrl
        });

        messageDiv.innerText = '情報が更新されました！';
      } catch (error) {
        console.error('情報の更新エラー', error);
        messageDiv.innerText = 'エラーが発生しました: ' + error.message;
      }
    });

    // キャンセルボタンのクリックイベント
    const cancelButton = document.getElementById('cancel-button');
    cancelButton.addEventListener('click', () => {
      // ダッシュボード画面に戻るなどの処理を追加する
      window.location.href = "dashboard.html";
    });
  } else {
    console.log('ログインしていません');
    // ログイン画面にリダイレクトするなどの処理を追加する
    window.location.href = "login.html";
  }
});
