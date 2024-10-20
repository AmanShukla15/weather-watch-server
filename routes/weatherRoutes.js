import express from 'express';
import { getWeatherByCity, getHistoricalWeather, getFutureWeather } from '../controllers/weatherController.js';

const router = express.Router();

// Get current weather for a city
router.get('/current/:city', getWeatherByCity);

// Get historical weather data for a city
router.get('/history', getHistoricalWeather);

// Get future weather forecast for a city
router.get('/forecast', getFutureWeather);

export default router;
