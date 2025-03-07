import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { getWeather } from "../utils/OpenWeatherApiCall.js";
import {ApiResponse} from '../utils/ApiResponse.js'

const getWeatherByCity = asyncHandler(async (req, res) => {
  const { city } = req.body;
  if (!city) {
    throw new ApiError(400, "City name is required");
  }
  try {
    const weatherData = await getWeather({ city });
    
    res
      .status(200)
      .json(new ApiResponse(200, "Data Fetched Successfully", weatherData));
  } catch (error) {
    throw new ApiError(500, "Failed to fetch weather data");
  }
});

const getWeatherByLocation = asyncHandler(async (req, res) => {
  const { lat, lon } = req.body;
  if (!lat || !lon) {
    throw new ApiError(400, "Latitude and Longitude are required");
  }
  const weatherData = await getWeather({ lat, lon });

  res
    .status(200)
    .json(new ApiResponse(200, "Data Fetched Successfully", weatherData));
});
export { getWeatherByCity, getWeatherByLocation };
