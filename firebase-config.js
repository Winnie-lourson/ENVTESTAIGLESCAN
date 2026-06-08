import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAPPejfOr2YeREbOc7vjGQ6wIny7PX3Kz4",
  authDomain: "aiglescan.firebaseapp.com",
  projectId: "aiglescan",
  storageBucket: "aiglescan.firebasestorage.app",
  messagingSenderId: "809108260464",
  appId: "1:809108260464:web:b612e4ecb20708e0d1d6b5"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };



// ==============================================================
// CODE FIREBASE POUR CONNEXION
// ==============================================================
//
// Import the functions you need from the SDKs you need
//
//  import { initializeApp } from "firebase/app";
//  import { getAnalytics } from "firebase/analytics";
//
//
// TODO: Add SDKs for Firebase products that you want to use
//
//  https://firebase.google.com/docs/web/setup#available-libraries
//
//
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//
//  const firebaseConfig = {
//    apiKey: "AIzaSyAPPejfOr2YeREbOc7vjGQ6wIny7PX3Kz4",
//    authDomain: "aiglescan.firebaseapp.com",
//    projectId: "aiglescan",
//    storageBucket: "aiglescan.firebasestorage.app",
//    messagingSenderId: "809108260464",
//    appId: "1:809108260464:web:b612e4ecb20708e0d1d6b5",
//    measurementId: "G-MELEN345NK"
//  };
//
//
// Initialize Firebase
//  const app = initializeApp(firebaseConfig);
//  const analytics = getAnalytics(app);
//
//
// ==============================================================