import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { FirebaseContext } from "./firebase/FirebaseContext.js";
import { auth, db, storage } from "./firebase/config.js";
import { UserContextProvider } from "./context/contextProvider.jsx";

const firebaseDb = { auth, db, storage };

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FirebaseContext.Provider value={firebaseDb}>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </FirebaseContext.Provider>
  </StrictMode>
);
