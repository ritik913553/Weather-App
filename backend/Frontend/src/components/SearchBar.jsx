import React, { useState, useRef, useEffect } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useWeather } from "../context/weatherContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { historyRefine } from "../utils/histroyRefine.js";
import { FaHistory } from "react-icons/fa";
const SearchBar = () => {
  const navigate = useNavigate();
  const { city, setCity, setUser } = useWeather();
  // Local state to handle input value
  const [searchInput, setSearchInput] = useState("");
  const { user, isAuthenticated, getSearchHistory } = useAuth();
  const [searchHistory, setSearchHistory] = useState(null);
  const EnterHandler = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setCity(searchInput);
      setUser(user);
      setSearchInput("");
      navigate("/");
    }
  };

  useEffect(() => {
    (async () => {
      const history = await getSearchHistory();
      const refinedHistory = historyRefine(history);
      console.log(refinedHistory);
      setSearchHistory(refinedHistory);
    })();
  }, [user]);

  return (
    <div className="h-screen w-full bg-gray-700">
      <div className="text-white p-5">
        <div className="flex items-center gap-3 text-xl">
          <MdOutlineKeyboardBackspace size={30} onClick={() => navigate("/")} />
          <input
            type="text"
            placeholder="Search for location"
            className="outline-none placeholder:px-2"
            value={searchInput} // Use local state for the input value
            onChange={(e) => setSearchInput(e.target.value)} // Handle the change with the onChangeHandler
            onKeyDown={EnterHandler}
          />
        </div>
      </div>
      <hr className="text-white" />
      <div className="text-white pt-2 px-5">
        <h1 className="text-lg">Recent Searches</h1>
        <div className="px-5 mt-2">
          {searchHistory &&
            searchHistory.map((item, index) => (
              <div key={index}>
                <div
                  onClick={() => {
                    setCity(item.city);
                    navigate("/");
                  }}
                  className="flex justify-between py-2"
                >
                  <p>{item.city}</p>
                  <p className="flex gap-x-1">
                    <FaHistory /> {item.refineDate}
                  </p>
                </div>
                <hr />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
