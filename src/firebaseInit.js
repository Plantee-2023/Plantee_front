import { initializeApp } from "firebase/app";
 
const firebaseConfig = {
    apiKey: "AIzaSyAEbBfR_YaMia4B2BkTodLhYABFuM0YXg8",
    authDomain: "plant-f36eb.firebaseapp.com",
    databaseURL: "https://plant-f36eb-default-rtdb.firebaseio.com",
    projectId: "plant-f36eb",
    storageBucket: "plant-f36eb.appspot.com",
    messagingSenderId: "903842598001",
    appId: "1:903842598001:web:3884e3758b6a1c22b8dfd0",
    measurementId: "G-CYE8F07DR8"
  };

  // Initialize Firebase
 
 

export const app = initializeApp(firebaseConfig);