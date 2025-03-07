import React from "react";
import { useWeather } from "../../context/weatherContext";
import { getWindStatus } from "../../utils/WindStatus";

const CurrentCOnditions = ({bgColor}) => {
  const { weather } = useWeather();
  return (
    <div className="mt-8 px-4">
      <h1>Current conditions</h1>
      <div className="mt-2 flex flex-wrap  gap-4">
        <div className={`wind p-3 rounded-lg ${bgColor.secondaryBg} ${bgColor.textColor} shrink-0 w-[calc(50%-0.5rem)]`}>
          <h1 className="text-sm">Wind</h1>
          <div className="">
            <div className="mt-5">
              <h3 className="text-2xl">
                {weather?.wind?.speed} <span className="text-sm">m/s</span>
              </h3>
              <p className="w-[60%] text-xs">
                {getWindStatus(weather?.wind?.speed, weather?.wind?.deg)}{" "}
              </p>
            </div>
          </div>
        </div>
        <div className={`wind p-3 rounded-lg ${bgColor.secondaryBg} ${bgColor.textColor} shrink-0 w-[calc(50%-0.5rem)]`}>
          <h1 className="text-sm">Humidity</h1>
          <div className="">
            <div className="mt-5">
              <h3 className="text-2xl">
                {weather?.main?.humidity} <span className="text-sm">%</span>
              </h3>
             
            </div>
          </div>
        </div>
        <div className={`wind p-3 rounded-lg ${bgColor.secondaryBg} ${bgColor.textColor} shrink-0 w-[calc(50%-0.5rem)]`}>
          <h1>Wind</h1>
          <p>5 km/h</p>
        </div>
        <div className={`wind p-3 rounded-lg ${bgColor.secondaryBg} ${bgColor.textColor} shrink-0 w-[calc(50%-0.5rem)]`}>
          <h1 className="text-sm">Pressure</h1>
          <div className="">
            <div className="mt-5">
              <h3 className="text-2xl w-[50%] leading-5">
                {weather?.main?.pressure} <span className="text-sm">hPa</span>
              </h3>
             
            </div>
          </div>
        </div>
      </div>
      <div className={`rounded-lg ${bgColor.secondaryBg} ${bgColor.textColor} mt-4 p-22`}></div>
    </div>
  );
};

export default CurrentCOnditions;
