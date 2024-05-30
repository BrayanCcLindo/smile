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
  apiKey: "AIzaSyBTKJm68Pf1Ds-rr2oLpovR-Tnfjqmp1j4",
  authDomain: "smile-donation.firebaseapp.com",
  projectId: "smile-donation",
  storageBucket: "smile-donation.appspot.com",
  messagingSenderId: "997059848053",
  appId: "1:997059848053:web:ce098409cb85cbf26c153c",
  measurementId: "G-WWYL0PWVC2",
};

export const app = initializeApp(fbconfig);
export const db = getFirestore(app);
export const auth = getAuth();

// Initialize Firebase
