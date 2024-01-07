import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCZmL98_pVYsSgOPX3CbUi1eFVRnaZZwMc",
    authDomain: "univolunteerauthentification.firebaseapp.com",
    projectId: "univolunteerauthentification",
    storageBucket: "univolunteerauthentification.appspot.com",
    messagingSenderId: "504714017966",
    appId: "1:504714017966:web:a85646182351b9fe58c13f"
};

const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DATABASE = getFirestore(FIREBASE_APP);
