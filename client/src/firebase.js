// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyARWooeyzTi4vXrrOvcaqZelmoeCH5Maio",
  authDomain: "ecommerce-lab2.firebaseapp.com",
  projectId: "ecommerce-lab2",
  storageBucket: "ecommerce-lab2.appspot.com",
  messagingSenderId: "216033692353",
  appId: "1:216033692353:web:3b16f25bed772e5a85e240",
  measurementId: "G-8CK1BZS16L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();