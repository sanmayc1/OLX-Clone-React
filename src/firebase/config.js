import { initializeApp } from "firebase/app";
import{getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDSsQ_8I-7_pindfZsUrTli2lNPWeKQPX8",
  authDomain: "olx-clone-b8127.firebaseapp.com",
  projectId: "olx-clone-b8127",
  storageBucket: "olx-clone-b8127.firebasestorage.app",
  messagingSenderId: "1032466508609",
  appId: "1:1032466508609:web:780e62abc28af16dcccfc0",
  measurementId: "G-W08KZRCLYV"
  };

  const app = initializeApp(firebaseConfig)
  export const auth = getAuth(app);
  export const  db = getFirestore(app)
  export const storage = getStorage(app)