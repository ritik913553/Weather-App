import { Router } from "express";

const router = Router();
import {verifyJWT} from '../middlewares/auth.middleware.js'

import { getWeatherByCity, getWeatherByLocation ,getSearchHistory} from '../controllers/weather.controllers.js'


router.route('/city').post(getWeatherByCity)
router.route('/location').post(getWeatherByLocation)
router.route('/search-history').get(verifyJWT,getSearchHistory)

export default router;