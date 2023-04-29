import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDsXFthXNiOQ2GYFYTjiVezFYDJZQ9XtPU",
    authDomain: "psintegra-db.firebaseapp.com",
    projectId: "psintegra-db",
    storageBucket: "psintegra-db.appspot.com",
    messagingSenderId: "1060010124788",
    appId: "1:1060010124788:web:d1ba474f4cf9daa30fc5a1",
    measurementId: "G-12RVLPY4B3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
