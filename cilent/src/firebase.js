// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIERBASE_API_KEY,
  authDomain: "mern-estate-62086.firebaseapp.com",
  projectId: "mern-estate-62086",
  storageBucket: "mern-estate-62086.appspot.com",
  messagingSenderId: "837061618663",
  appId: "1:837061618663:web:4e9a53f3c7fc8648d32b42"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);