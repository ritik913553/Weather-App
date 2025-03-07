import { Router } from "express";

const router = Router();

import { getWeatherByCity, getWeatherByLocation } from '../controllers/weather.controllers.js'


router.route('/city').post(getWeatherByCity)
router.route('/location').post(getWeatherByLocation)

export default router;