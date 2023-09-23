// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDK9P65mb0aU1cvqn5GEk-OolFqTcOluHA",
  authDomain: "house-marketplace-app-702a0.firebaseapp.com",
  projectId: "house-marketplace-app-702a0",
  storageBucket: "house-marketplace-app-702a0.appspot.com",
  messagingSenderId: "935676556153",
  appId: "1:935676556153:web:b639fde4365f0d3841b5a8"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();