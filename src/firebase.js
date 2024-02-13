import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCkwdLGTQnp7q_YdeUhbsphDBC6519-Bl0",
  authDomain: "fir-chat-bbbe8.firebaseapp.com",
  projectId: "fir-chat-bbbe8",
  storageBucket: "fir-chat-bbbe8.appspot.com",
  messagingSenderId: "225248622754",
  appId: "1:225248622754:web:baccb18515954ec4a1fffb"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth() ;
export const storage = getStorage();
export const db = getFirestore(app);