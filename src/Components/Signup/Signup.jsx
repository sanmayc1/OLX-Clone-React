import React, { useContext, useEffect, useState } from "react";
import Logo from "/Images/OLX-Symbol.png";
import { FirebaseContext } from "../../firebase/FirebaseContext";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import {useNavigate} from 'react-router-dom'
import { UserContext } from "../../context/context";


export default function Signup() {
  const {userD} = useContext(UserContext);
  const { auth, db } = useContext(FirebaseContext);
  const navigate  = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  
  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const doc = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      if(doc){
        await updateProfile(doc.user,{displayName:user.username})
        const userAdd = await addDoc(collection(db,'user'),{
          id:doc.user.uid,
          username:user.username,
          phone:user.phone
        })
        if(userAdd){
          
          navigate('/login')
        }
      }
    } catch (error) {
      alert(error)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex flex-col items-center mb-6">
          <img src={Logo} alt="Logo" className="w-23 h-16 mb-10 " />
          <h2 className="text-2xl font-bold text-gray-900">Sign Up</h2>
        </div>

        <form onSubmit={handleSumbit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username"
              value={user.username}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email"
              value={user.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter phone number"
              value={user.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="mb-3 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Create password"
              value={user.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600" onClick={()=>navigate('/login')}>
          Already have an account?{" "}
          <span className="text-blue-600 hover:text-blue-800" >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}
