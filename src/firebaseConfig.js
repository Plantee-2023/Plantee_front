import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD_eFZGjlTBsieIEua85h_tjN1kmwFRb3g",
  authDomain: "plantee-d1ce6.firebaseapp.com",
  databaseURL: "https://plantee-d1ce6-default-rtdb.firebaseio.com",
  projectId: "plantee-d1ce6",
  storageBucket: "plantee-d1ce6.appspot.com",
  messagingSenderId: "318459792156",
  appId: "1:318459792156:web:433e14cce951b7df2208d9",
  measurementId: "G-X09ZV5HVWY"
};

// Initialize Firebase



export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); // 인증
export const db = getFirestore(app); // DB
export const storage = getStorage(app); // 사진