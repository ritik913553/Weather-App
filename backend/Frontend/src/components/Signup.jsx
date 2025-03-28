import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email || !password || !name){
      alert('All fields are required');
      return;
    }
    try {
      const res = await axios.post("/api/v1/user/register", {
        name,
        email,
        password,
      });
      console.log(res)
      toast.success("Account created Successfully !")
      navigate('/login')
    } catch (error) {
      console.log(error);
      toast.error("Error creating account")
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="off"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none  outline-none"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email field */}
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
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none  outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Password field */}
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
              minLength="6"
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="off"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none  outline-none"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none  outline-none"
            >
              Sign Up
            </button>
          </div>
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">
              Already have an account?{" "}
            </span>
            <Link to={"/login"} className="text-blue-500 hover:underline">
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
