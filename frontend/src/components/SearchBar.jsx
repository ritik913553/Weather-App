import React, { useState, useRef } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useWeather } from "../context/weatherContext.jsx";

const SearchBar = () => {
  const navigate = useNavigate();
  const { city, setCity } = useWeather();
  // Local state to handle input value
  const [searchInput, setSearchInput] = useState("");
  
  const EnterHandler = (e)=>{
    if(e.key === 'Enter'){
      e.preventDefault();
      setCity(searchInput);
      setSearchInput("");
      navigate('/')
    }
  }


  return (
    <div className="h-screen w-full bg-gray-700">
      <div className="text-white p-5">
        <div className="flex items-center gap-3 text-xl">
          <MdOutlineKeyboardBackspace size={30} onClick={() => navigate('/')} />
          <input
            type="text"
            placeholder="Search for location"
            className="outline-none placeholder:px-2"
            value={searchInput} // Use local state for the input value
            onChange={(e)=>setSearchInput(e.target.value)} // Handle the change with the onChangeHandler
            onKeyDown={EnterHandler}
          />
        </div>
      </div>
      <hr className="text-white" />
    </div>
  );
};

export default SearchBar;
