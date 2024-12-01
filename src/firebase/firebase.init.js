// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsBaOlChj0GVjsv2U3_vtLhoFcjqqGDEg",
  authDomain: "coffee-store-f69f7.firebaseapp.com",
  projectId: "coffee-store-f69f7",
  storageBucket: "coffee-store-f69f7.firebasestorage.app",
  messagingSenderId: "335143463405",
  appId: "1:335143463405:web:52a1c2cef1df10aecd1fe4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);