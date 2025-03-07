import React from "react";
import { useNavigate ,Link} from "react-router-dom";
import { MdOutlineLocationOn } from "react-icons/md";
import { useWeather } from "../../context/weatherContext";
const Search = ({ bgColor }) => {
  const navigate = useNavigate();
  const { city, country,weather } = useWeather();
  console.log(weather);
  
  return (
    <div className="px-4 flex justify-between items-center gap-x-5">
      <div
        onClick={() => {
          navigate("/search");
        }}
        className={`py-2 px-3 rounded-full w-full ${bgColor.secondaryBg} ${bgColor.textColor} flex items-center text-xl  gap-x-7`}
      >
        <span className="text-2xl">
          <MdOutlineLocationOn />
        </span>
        <h1>
          {weather ? `${weather?.name} , ` : "Search By City"}{" "}
          <span>{country ? country : ""}</span>{" "}
        </h1>
      </div>
      <Link to={'/login'} className={`px-2 py-[5px] rounded-md text-lg text-gray-700 ${bgColor.secondaryBg} ${bgColor.textColor} font-medium`}>
        Login
      </Link>
    </div>
  );
};

export default Search;
