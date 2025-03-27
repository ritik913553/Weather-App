import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // 🔹 Check authentication when app loads
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/v1/user/profile", {
          withCredentials: true,
        });
        setUser(res.data.data);
        setIsAuthenticated(true);
      } catch (error) {
        setUser(null);
        console.log(error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // 🔹 Login function
  const login = async (credentials) => {
    try {
      const res = await axios.post(
        "/api/v1/user/login",
        credentials,
        {
          withCredentials: true, // Ensures cookie storage
        }
      );
      console.log(res);
      setUser(res.data.data.user);
      setIsAuthenticated(true);
      navigate('/')
      toast.success("Logged in successfully!");
      return true;
    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
  };

 

  // 🔹 Logout function
  const logout = async () => {
    try {
      await axios.get(
        "/api/v1/user/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      setIsAuthenticated(false);
      console.log("Logged out");
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Search history
  const getSearchHistory = async () => {
    try {
      const res = await axios.get("/api/v1/weather/search-history", {
        withCredentials: true,
      });
      return res.data.data;
    } catch (error) {
      console.error("Failed to fetch search history", error);
      return [];
    }
  };
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, loading ,getSearchHistory}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
// Custom hook to use auth state
export const useAuth = () => useContext(AuthContext);