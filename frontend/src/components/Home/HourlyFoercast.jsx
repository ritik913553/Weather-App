import React from "react";
import { MdNightlightRound } from "react-icons/md";

import { IoIosCloudyNight } from "react-icons/io";
import { FaSun } from "react-icons/fa6";
import { BsCloudSun } from "react-icons/bs";
import { FaCloudSunRain } from "react-icons/fa6";
import { useWeather } from "../../context/weatherContext.jsx";

const HourlyFoercast = ({bgColor}) => {
  const { foercast } = useWeather();
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");

  const timeConverter = (time) => {
    if (time > 12) {
      return `${time - 12} pm`;
    }
    return `${time} am`;
  };

  return (
    <div className="mt-5 px-4">
      <h1>Hourly forecast</h1>
      <div className={`scrollbar rounded-md h-26 ${bgColor.secondaryBg} overflow-auto flex gap-6 ${bgColor.textColor} py-3 px-8 justify-between flex-nowrap `}>
        {foercast &&
          foercast[day].hourlyData.map((data, index) => {
            const time = parseInt(data.dt_txt.split(" ")[1].split(":")[0]);
            const timeFormatted = timeConverter(time);
            const isNightTime = time > 18 || time < 5;
            const isCloudy = data.weather[0].main
              .toLowerCase()
              .includes("cloud");

            let icon = null;
            if (isNightTime) {
              if (isCloudy) {
                icon = <IoIosCloudyNight size={20} />;
              } else {
                icon = <MdNightlightRound size={20} />;
              }
            } else {
              if (isCloudy) {
                icon = <FaCloudSunRain size={20} />;
              } else {
                icon = <FaSun size={20} />;
              }
            }

            return (
              <div
                key={index}
                className="text-sm flex flex-col justify-between shrink-0"
              >
                <h1>
                  {Math.floor(data.main.temp)} <sup>o</sup>
                </h1>
                <div className="flex flex-col gap-y-1.5">
                  <span>{icon}</span>
                  <p className="text-xs">{timeFormatted}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default HourlyFoercast;
