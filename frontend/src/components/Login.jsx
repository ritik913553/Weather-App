import React, { useState } from "react";
import {useNavigate,Link} from 'react-router-dom'
import axios from 'axios'
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook to navigate to another page

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Email:", email);
    console.log("Password:", password);
    try {
      await axios.post('/api/v1/user/login',{email,password})
    } catch (error) {
      if(error.status == 401){
        toast.error("Invalid credentials", { duration: 2000 });
      }
      console.log("Error During Login:",error)
    }
  };



  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-6">Login to Weather APP</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="off"
              className="w-full p-3 border border-gray-300 rounded-md outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="off"
              className="w-full p-3 border border-gray-300 rounded-md outline-none"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 outline-none font-medium"
            >
              Login
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">Don't have an account? </span>
          <Link
           to={'/signup'}
            className="text-blue-500 hover:underline"
          >
            Sign up here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
