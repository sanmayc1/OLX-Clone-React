import { initializeApp } from "firebase/app";
import{getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCNChDShsTTINawjDlcpG0JSxoJQ9XfBbo",
    authDomain: "olx-clone-2ac34.firebaseapp.com",
    projectId: "olx-clone-2ac34",
    storageBucket: "olx-clone-2ac34.firebasestorage.app",
    messagingSenderId: "991091732834",
    appId: "1:991091732834:web:d1ed4930c2f312762dfc3b",
    measurementId: "G-FEZFQP4ZNE"
  };

  const app = initializeApp(firebaseConfig)
  export const auth = getAuth(app);
  export const  db = getFirestore(app)