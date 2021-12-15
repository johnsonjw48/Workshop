import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBKSOfmXwsiivLEzldZR9vP0jHY0rG3ejw",
    authDomain: "dashboard-7ee84.firebaseapp.com",
    projectId: "dashboard-7ee84",
    storageBucket: "dashboard-7ee84.appspot.com",
    messagingSenderId: "171050040674",
    appId: "1:171050040674:web:fb4420d0c89d14fbd3803b"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export default db;
