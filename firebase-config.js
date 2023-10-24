// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDOkMdEmBtV1F-lnnb8d8bcRHCFw20_JoI",
    authDomain: "blog-post-f77fd.firebaseapp.com",
    projectId: "blog-post-f77fd",
    storageBucket: "blog-post-f77fd.appspot.com",
    messagingSenderId: "738592446152",
    appId: "1:738592446152:web:052b26184d336edd36f7fd",
    measurementId: "G-RW2STWS4C6"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();