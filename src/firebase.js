// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA0K-gXBiMb791kohwHj43EQmAb45ziK3Q",
    authDomain: "reflexpro-c6981.firebaseapp.com",
    projectId: "reflexpro-c6981",
    storageBucket: "reflexpro-c6981.firebasestorage.app",
    messagingSenderId: "990792363675",
    appId: "1:990792363675:web:e49b5fef361f625111e03e",
    measurementId: "G-6JC062CFHH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);