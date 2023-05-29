// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdN-SyhveoKhoiiO3uF0rhlq1W5oDN15w",
  authDomain: "react-netflix-clone-6771c.firebaseapp.com",
  projectId: "react-netflix-clone-6771c",
  storageBucket: "react-netflix-clone-6771c.appspot.com",
  messagingSenderId: "751511113330",
  appId: "1:751511113330:web:92519e4f2ff3d22af5bceb",
  measurementId: "G-9GYF58WZZE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);