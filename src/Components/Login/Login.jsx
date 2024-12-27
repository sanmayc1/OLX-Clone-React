import React, { useContext, useState } from "react";
import Logo from "/Images/OLX-Symbol.png";
import { FirebaseContext } from "../../firebase/FirebaseContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading"

function Login() {
  const navigate = useNavigate();
   const [loading,setLoading]=useState(false)
  const { auth, db } = useContext(FirebaseContext);

  //input filed value
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  //authentication 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const verified = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      if (verified) {
        setLoading(false)
        navigate("/");
      }
    } catch (error) {
      alert(error);
      setLoading(false)
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
          <img src={Logo} alt="Logo" className="w-28 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900">Login</h2>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
            />
          </div>

          <button
           disabled={loading}
           className="flex justify-center w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
            {loading?<ReactLoading type="spin" color="#ffff" height={25} width={30} />:"Login"}
          </button>
        </form>

        <p
          className="mt-4 text-center text-sm text-gray-600"
          onClick={() => navigate("/signup")}
        >
          Don't have an account?{" "}
          <span className="text-blue-600 hover:text-blue-800">Sign up</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
