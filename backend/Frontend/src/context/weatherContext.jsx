/*import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const WeatherContext = createContext();
const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const getWeatherData = async () => {
      if (!navigator.geolocation) {
        console.log("Geolocation is not supported by this browser.");
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            console.log(lat, lon);
            setLoading(true);
            (async()=>{
               try {
                const res = await axios.post('http://localhost:8000/api/v1/weather/location',{lat,lon})
                setWeather(res.data.data);
                setCity(res.data.data.name)
                console.log(res.data.data);
                setLoading(false)
               } catch (error) {
                 console.error("Failed to fetch weather data:", error);
               }

            })()
            setLocation({ lat, lon });
        },
        (error) => {
            console.error(`Error: ${error.message}`);
            setLoading(false);
        }
      );
      
    };
    getWeatherData();
  }, []);
  useEffect(()=>{
    setLoading(true);
    (async()=>{
        try {
          const res = await axios.post('http://localhost:8000/api/v1/weather/city',{city})
          console.log(res.data)
          setWeather(res.data.data);
          console.log(res.data.data);
          setLoading(false)
        } catch (error) {
          console.error("Failed to fetch weather data of city:", error);
        }
    })()
  },[city])
  return (
    <WeatherContext.Provider
      value={{
        city,
        setCity,
        weather,
        setWeather,
        loading,
        setLoading,
        location,
        setLocation,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
export const useWeather = () => useContext(WeatherContext);
*/



import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { getCountryName } from "../utils/GetCountryName";

const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [country, setCountry] = useState(null);
  const [foercast,setFoercast] = useState(null);
  const [user,setUser] = useState(null);
  useEffect(() => {
    const getWeatherData = async () => {
      if (!navigator.geolocation) {
        console.log("Geolocation is not supported by this browser.");
        return;
      }



      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLoading(true);
          fetchWeatherByLocation(lat, lon);
          setLocation({ lat, lon });

        },
        (error) => {
          console.error(`Error: ${error.message}`);
          setLoading(true);
        }
      );
    };

    if (!city) {
      getWeatherData();
    }
   
  }, [city]); // Only trigger if city is null (first time visit)

  const fetchWeatherByLocation = async (lat, lon) => {
    try {
      if(localStorage.getItem('weather')){
        setWeather(JSON.parse(localStorage.getItem('weather')));
        setFoercast(JSON.parse(localStorage.getItem('foercast')));
        return
      }
      const res = await axios.post('http://localhost:8000/api/v1/weather/location', { lat, lon });
      setWeather(res.data.data.current);
      setFoercast(res.data.data.foercast);
      setCity(res.data.data.current.name);
      setCountry(getCountryName(res.data.data.current.sys.country));
      setLoading(false);
      localStorage.setItem('weatherCurrent', JSON.stringify(res.data.data.current))
      localStorage.setItem('foercast',JSON.stringify(res.data.data.foercast))
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
      setLoading(false);
    }
  };

  const fetchWeatherByCity = async (city) => {
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:8000/api/v1/weather/city', { city, userId: user?._id });
      setWeather(res.data.data.current);
      setFoercast(res.data.data.foercast);
      setCountry(getCountryName(res.data.data.current.sys.country));
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch weather data for city:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city && city !== null) {
      fetchWeatherByCity(city);
    }
  }, [city]); // Trigger weather fetch when city is set

  return (
    <WeatherContext.Provider
      value={{
        city,
        setCity,
        weather,
        setWeather,
        loading,
        setLoading,
        location,
        setLocation,
        country,
        foercast,
        user,
        setUser
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
export const useWeather = () => useContext(WeatherContext);
