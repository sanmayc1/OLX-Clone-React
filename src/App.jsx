import "./App.css";
import Home from "./Pages/Home.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupPage from "./Pages/Signup.jsx";
import LoginPage from "./Pages/Login.jsx";
import { useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseContext } from "./firebase/FirebaseContext.js";
import { UserContext } from "./context/context.jsx";
import CreatePage from "./Pages/Create.jsx";
import Posts from "./Components/Posts/Posts.jsx";
import ViewPost from "./Pages/ViewPost.jsx";


function App() {
  const {auth} = useContext(FirebaseContext)
  const {setUserD}= useContext(UserContext)

  useEffect(()=>{
   const unsubscribe= onAuthStateChanged(auth,(user)=>{
      setUserD(user)
      
    })
    return () => unsubscribe();
  },[auth,setUserD])
  return (
    <>
    
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-product" element={<CreatePage/>} />
          <Route path="/viewpost/:id/:uid" element={<ViewPost/>} />
        </Routes>
      </Router>
      
      
    </>
  );
}

export default App;
