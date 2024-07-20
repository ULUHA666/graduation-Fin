// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

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

async function confirmSignup() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const name = document.getElementById('name').value;
  const address = document.getElementById('address').value;
  const profilePicture = document.getElementById('profilePicture').files[0];
  const messageDiv = document.getElementById('message');

  // フォームのバリデーション
  if (!email || !password || !name || !address) {
    messageDiv.innerText = '全てのフィールドを入力してください。';
    return;
  }

  if (password.length < 8 || password.length > 16) {
    messageDiv.innerText = 'パスワードは8文字以上16文字以下で入力してください。';
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userId = user.uid;

    let profilePicUrl = '';
    if (profilePicture) {
      const profilePicRef = storageRef(storage, 'profilePictures/' + userId + '/' + profilePicture.name);
      await uploadBytes(profilePicRef, profilePicture);
      profilePicUrl = await getDownloadURL(profilePicRef);
    }

    await set(ref(database, 'users/' + userId), {
      email: email,
      name: name,
      address: address,
      profilePicture: profilePicUrl
    });

    messageDiv.innerText = '登録が完了しました！';
    // 登録が完了したらログイン画面にリダイレクト
    window.location.href = "login.html";
  } catch (error) {
    messageDiv.innerText = 'エラー: ' + error.message;
  }
}

// confirmSignup をグローバルスコープに公開する
window.confirmSignup = confirmSignup;
