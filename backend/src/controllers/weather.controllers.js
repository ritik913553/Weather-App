import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { getWeather } from "../utils/OpenWeatherApiCall.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const getWeatherByCity = asyncHandler(async (req, res) => {
  const { city, userId } = req.body;

  if (!city) {
    throw new ApiError(400, "City name is required");
  }
  try {
    const weatherData = await getWeather({ city });
    const user = await User.findById(userId);
    if (user) {
      user.searchHistory.push({
        city: city,
        searchDate: new Date(),
      });

      if (user.searchHistory.length > 10) {
        user.searchHistory.shift(); // Removes the first element in the array
      }
      await user.save();
    }
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

const getSearchHistory = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  res.json(new ApiResponse(200, "Search History Fetched Successfully", user.searchHistory));
})

export { getWeatherByCity, getWeatherByLocation,getSearchHistory };
