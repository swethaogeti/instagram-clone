// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9Fir9dzSLFWk2AEsALVAluECIvXxojk8",
  authDomain: "instagram-clone-175ca.firebaseapp.com",
  projectId: "instagram-clone-175ca",
  storageBucket: "instagram-clone-175ca.appspot.com",
  messagingSenderId: "1037678238281",
  appId: "1:1037678238281:web:a9f4a104ea59a3d5b97d98",
  measurementId: "G-SFBPCBNC36",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
