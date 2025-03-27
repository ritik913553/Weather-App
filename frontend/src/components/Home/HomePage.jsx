import React, { useEffect, useState } from "react";
import Search from "./Search";
import OverAll from "./OverAll";
import HourlyFoercast from "./HourlyFoercast";
import DailyFoercast from "./TenDayoercast";
import TenDayoercast from "./TenDayoercast";
import CurrentCOnditions from "./CurrentCOnditions";
import { useWeather } from "../../context/weatherContext";
import SkeletonLoader from "../SkeletonLoader";
import ProfilePage from "../ProfilePage.jsx";
const HomePage = () => {
  const { loading, weather } = useWeather();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [bgColor, setBgColor] = useState({
    mainBg: "",
    secondaryBg: "",
    textColor: "",
  });
  const hour = new Date().getHours();
  const getBgColors = (description = "") => {
    if (description.includes("clear"))
      return {
        mainBg: hour > 18 || hour < 6 ? "bg-[#1E1F26]" : "bg-[#87CEEB]",
        secondaryBg: "bg-[#E0F7FA]",
        textColor: "text-[#064273]",
      };
    if (description.includes("cloud"))
      return {
        mainBg: hour > 18 || hour < 6 ? "bg-[#424B54]" : "bg-[#B0C4DE]",
        secondaryBg: "bg-[#D3D3D3]",
        textColor: "text-[#2C3E50]",
      };
    if (description.includes("rain"))
      return {
        mainBg: hour > 18 || hour < 6 ? "bg-[#2E3B4E]" : "bg-[#6D8FAF]",
        secondaryBg: "bg-[#A0B9D9]",
        textColor: "text-[#F5F5F5]",
      };
    if (description.includes("snow"))
      return {
        mainBg: hour > 18 || hour < 6 ? "bg-[#3A3D4A]" : "bg-[#F8F8FF]",
        secondaryBg: "bg-[#DDE6ED]",
        textColor: "text-[#2E2E2E]",
      };
    if (description.includes("thunderstorm"))
      return {
        mainBg: hour > 18 || hour < 6 ? "bg-[#1A1A2E]" : "bg-[#4C516D]",
        secondaryBg: "bg-[#6D7B8D]",
        textColor: "text-[#EAEAEA]",
      };
    if (description.includes("haze"))
      return {
        mainBg: hour > 18 || hour < 6 ? "bg-[#5A4F3B]" : "bg-[#E0C9A6]",
        secondaryBg: "bg-[#F3E0C9]",
        textColor: "text-[#4A3F35]",
      };
    return {
      mainBg: hour > 18 || hour < 6 ? "bg-gray-600" : "bg-gray-200",
      secondaryBg: "bg-gray-300",
      textColor: "text-gray-800",
    }; // Default
  };

  useEffect(() => {
    if (!weather || !weather.weather || weather.weather.length === 0) return;
    const description = weather?.weather[0]?.main.toLowerCase();
    setBgColor(getBgColors(description));
  }, [weather]);
  return isProfileOpen ? (
    <ProfilePage bgColor={bgColor} setIsProfileOpen={setIsProfileOpen} />
  ) : (
    <div
      className={`pt-3  ${bgColor.mainBg}  h-auto w-full pb-10 relative  ${bgColor.textColor}`}
    >
      <Search bgColor={bgColor} setIsProfileOpen={setIsProfileOpen} />
      {loading ? (
        <SkeletonLoader />
      ) : (
        <div>
          <OverAll bgColor={bgColor} />
          <HourlyFoercast bgColor={bgColor} />
          <TenDayoercast bgColor={bgColor} />
          <CurrentCOnditions bgColor={bgColor} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
