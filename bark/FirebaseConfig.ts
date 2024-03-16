// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDazBGHC90vb8rwnaVhHuCCncc48YiElRE",
  authDomain: "bark-d3073.firebaseapp.com",
  projectId: "bark-d3073",
  storageBucket: "bark-d3073.appspot.com",
  messagingSenderId: "1015118829268",
  appId: "1:1015118829268:web:c09f79843ac2fdafbe0d41",
  measurementId: "G-G3FLRTZL7L"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);