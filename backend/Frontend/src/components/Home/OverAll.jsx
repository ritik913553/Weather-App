import React, { useEffect, useState } from "react";
import { useWeather } from "../../context/weatherContext";

const OverAll = () => {
  const { weather, loading } = useWeather();
  const [bgImage, setBGImage] = useState("");

  const getBgImage = (description = "") => {
    if (description.includes("rain")) return "/assets/rainlight.jpg";
    if (description.includes("cloud")) return "/assets/clouds.jpeg";
    if (description.includes("clear")) return "/assets/sunny.jpeg";
    if (description.includes("snow")) return "/assets/snow.jpeg";
    if (description.includes("thunderstorm"))
      return "/assets/thunderstorm.jpeg";
    if (description.includes("haze")) return "/assets/haze.jpeg";
    return "";
  };
  useEffect(() => {
    if (!weather || !weather.weather || weather.weather.length === 0) return;
    const description = weather?.weather[0]?.main.toLowerCase();
    setBGImage(getBgImage(description));
  }, [weather]);

  return (
    <>
      {loading ? (
        <h1>hii</h1>
      ) : (
        <div className="relative h-36 mt-5 w-full px-5 bg-transparent ">
          {bgImage && (
            <img
              className="absolute top-0 left-0 w-full h-full object-cover object-center z-0"
              src={bgImage}
              alt=""
            />
          )}
          <div className="relative z-10 text-black">
            <h1 className="font-semibold">Now</h1>
            <div className="flex justify-between">
              <h2 className="temperature text-6xl font-bold relative inline-block">
                {Math.floor(weather?.main?.temp)}
                <sup className="absolute text-3xl top-[-5px] text-bold right-[-20px]">
                  o
                </sup>
              </h2>
              <div>
                <p className="text-sm text-right font-semibold">
                  {weather?.weather[0]?.description}
                </p>
                <p className="feelslike text-sm text-right mt-1 ">
                  Feels like {Math.floor(weather?.main?.feels_like)}{" "}
                  <sup>0</sup>{" "}
                </p>
              </div>
            </div>
            <div className="flex gap-x-2 text-xs">
              <p>
                High : {Math.floor(weather?.main?.temp_max)} <sup>o</sup>{" "}
              </p>
              <p>
                Low : {Math.floor(weather?.main?.temp_min)} <sup>o</sup>{" "}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OverAll;
