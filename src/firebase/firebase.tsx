// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const fbconfig = {
  apiKey: "AIzaSyAa1_bYtaVXUHb44clKzl-oeVJZE635w_c",
  authDomain: "first-test-b0033.firebaseapp.com",
  databaseURL: "https://first-test-b0033-default-rtdb.firebaseio.com",
  projectId: "first-test-b0033",
  storageBucket: "first-test-b0033.appspot.com",
  messagingSenderId: "28214120891",
  appId: "1:28214120891:web:f0caf60324555e825bf49e",
  measurementId: "G-JPGWMC71TD",
};
export const app = initializeApp(fbconfig);
export const db = getFirestore(app);
export const auth = getAuth();

// Initialize Firebase
