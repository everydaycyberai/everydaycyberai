import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDxEf5j5LaR97Lbc1MmCnFdI6cf1hh-DFA",
  authDomain: "everyday-cyber-ai.firebaseapp.com",
  projectId: "everyday-cyber-ai",
  storageBucket: "everyday-cyber-ai.firebasestorage.app",
  messagingSenderId: "773269857822",
  appId: "1:773269857822:web:5657d4b0a86c0a6a9d700f"
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

console.log("Firebase Connected Successfully");