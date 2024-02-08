// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8UPfsyW21MTKluh7XOAFP8ISFHz9Wa_I",
  authDomain: "farmalaax.firebaseapp.com",
  projectId: "farmalaax",
  storageBucket: "farmalaax.appspot.com",
  messagingSenderId: "776298708917",
  appId: "1:776298708917:web:5b11adc1363950317b23fc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
export { db };