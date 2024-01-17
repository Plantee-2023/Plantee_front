import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyABdI6Nk90giYWHCixRu4XarLy5tK-gMKo",
  authDomain: "plantee-28eb0.firebaseapp.com",
  projectId: "plantee-28eb0",
  storageBucket: "plantee-28eb0.appspot.com",
  messagingSenderId: "46748421699",
  appId: "1:46748421699:web:196635ee5d1bf29f314ef6",
  measurementId: "G-WYEY1J33TR"
};

// Initialize Firebase



export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); // 인증
//export const db = getFirestore(app); // DB
//export const storage = getStorage(app); // 사진