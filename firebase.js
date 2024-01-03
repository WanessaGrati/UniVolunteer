// Import the functions you need from the SDKs you need
//import * as firebase from "firebase";
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
//import { getFirestore} from "@react-native-firebase/firestore/lib/modular";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCZmL98_pVYsSgOPX3CbUi1eFVRnaZZwMc",
    authDomain: "univolunteerauthentification.firebaseapp.com",
    projectId: "univolunteerauthentification",
    storageBucket: "univolunteerauthentification.appspot.com",
    messagingSenderId: "504714017966",
    appId: "1:504714017966:web:a85646182351b9fe58c13f"
};

// Initialize Firebase
/*
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
}
else {
    app = firebase.app()
}

const auth = firebase.auth()

export { auth };*/

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DATABASE = getFirestore(FIREBASE_APP);
