// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDeSSpYxLzyymxHrutxfIeRmcDJ5nXXEWk",
  authDomain: "text-editor-e8313.firebaseapp.com",
  projectId: "text-editor-e8313",
  storageBucket: "text-editor-e8313.appspot.com",
  messagingSenderId: "147291704641",
  appId: "1:147291704641:web:1ad5b5700eea854ded25c0",
  measurementId: "G-6XNE7T6HZ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()


export {app,auth};