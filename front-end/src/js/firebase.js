// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgHEAVFiWaxKdwErOFQZnng7sISAN_L4k",
  authDomain: "dep11-chat-app-dnz.firebaseapp.com",
  projectId: "dep11-chat-app-dnz",
  storageBucket: "dep11-chat-app-dnz.appspot.com",
  messagingSenderId: "355797998892",
  appId: "1:355797998892:web:e261d7ef02730632bda089"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export {app, auth};