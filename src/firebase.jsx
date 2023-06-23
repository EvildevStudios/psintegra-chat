import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyBfSIgC3Iq8EfZw6QkooxmP760MfW4-jXU",
	authDomain: "psintegra-firebase.firebaseapp.com",
	projectId: "psintegra-firebase",
	storageBucket: "psintegra-firebase.appspot.com",
	messagingSenderId: "931770628391",
	appId: "1:931770628391:web:e38bbb5a0430ee7d559102",
	measurementId: "G-TX60ZZM86K"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
