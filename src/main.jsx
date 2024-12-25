import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { FirebaseContext } from "./firebase/FirebaseContext.js";
import {auth,db} from "./firebase/config.js";

const firebaseDb ={auth,db}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FirebaseContext.Provider value={firebaseDb}>
      <App />
    </FirebaseContext.Provider>
  </StrictMode>
);
