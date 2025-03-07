import axios from "axios";
import { ApiError } from "./ApiError.js";
import { groupingTheFoercastDataThruDate } from "./GroupingFoercastData.js";

const API_KEY = process.env.OPEN_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

/**
 * Fetch weather data from OpenWeather API.
 * Supports fetching by city name OR latitude/longitude.
 * 
 * @param {Object} options - Query options (city or lat/lon).
 * @param {string} [options.city] - City name (optional).
 * @param {number} [options.lat] - Latitude (optional).
 * @param {number} [options.lon] - Longitude (optional).
 * @returns {Promise<Object>} - Returns weather data.
 */
async function getWeather({ city, lat, lon }) {
    try {
        let params = { appid: API_KEY, units: "metric" };

        if (city) {
            params.q = city;
        } else if (lat && lon) {
            params.lat = lat;
            params.lon = lon;
        } else {
            throw new ApiError(404,"Either city or latitude/longitude must be provided.");
        }

        const response = await axios.get(`${BASE_URL}/weather`, { params });
        const foercastResponse = await axios.get(`${BASE_URL}/forecast`, { params });
        const  groupedFoercastData = await groupingTheFoercastDataThruDate(foercastResponse.data.list)
        return {current:response.data, foercast: groupedFoercastData};
    } catch (error) {
        console.error("Error fetching weather data:", error.response?.data || error.message);
        throw new ApiError(500,"Failed to fetch weather data");
    }
}

export { getWeather };
