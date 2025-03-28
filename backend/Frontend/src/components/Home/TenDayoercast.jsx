import React from "react";
import { BsCloudHaze } from "react-icons/bs";
import { useWeather } from "../../context/weatherContext";

const TenDayoercast = ({bgColor}) => {
  const { foercast,loading } = useWeather();
  
  return (
    <div className="mt-5 px-4">
      <h1>5 Day foercast</h1>
      <div className="flex flex-col gap-2">
        {foercast && Object.keys(foercast).map((key,index) =>{
          const overalldata = foercast[key].overallData
          
          return (
            <div key={index} className={`flex justify-between rounded-t-lg rounded-b-sm py-2 px-2 items-center text-sm ${bgColor.textColor} ${bgColor.secondaryBg}`}>
            <h1>{key}</h1>
            <div className="flex gap-8 items-center">
              <BsCloudHaze />
              <p>
               {overalldata.minTemp}<sup>o</sup> / {overalldata.maxTemp} <sup>o</sup>{" "}
              </p>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
};

export default TenDayoercast;


/*

*/