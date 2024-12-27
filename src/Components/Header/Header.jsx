import React, { useContext } from "react";
import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/context.jsx";
import { FirebaseContext } from "../../firebase/FirebaseContext.js";
import { signOut } from "firebase/auth";

function Header() {
  const { userD ,setUserD} = useContext(UserContext);
  const {auth} = useContext(FirebaseContext)
  const navigate = useNavigate();

  const loginnavigate = () => {
    
    navigate("/login");
  };

  const logout = ()=>{
    signOut(auth).then(()=>{

      setUserD('')
     
    }).catch((err)=>{
      console.log(`logout error ${err}`)
    })

  }
  const sellButton = () => {
    if (userD) navigate("/create-product");
    else navigate("/login");
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>

        { userD ? (
          <div className="dropdown">
            <p className="show-name">{`Welcome ${userD.displayName}`}</p>
            <button className="log-out absolute left-8 text-red-600 underline px-3 py-1 rounded-md" onClick={logout}>Logout</button>

          </div>
        ) : (
          <div className="loginPage" onClick={loginnavigate}>
            <span>Login</span>
            <hr />
          </div>
        )}

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent" onClick={sellButton}>
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
