import axios from 'axios';
import { getCurrentWeather, getWeatherOfHistory } from '../services/openWeatherService.js';

// Fetch and return weather data for a specific city
export const getWeatherByCity = async (req, res) => {
  const { city } = req.params;
  try {
    const weatherData = await getCurrentWeather(city);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching weather data' });
  }
};

// Aggregate daily weather data for historical display
export const getHistoricalWeather = async (req, res) => {
  const { city, country, start, end } = req.query;
  try {

    const historyData = await getWeatherOfHistory(city, country, start, end);

    res.json(historyData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching History weather data' });
  }

};

export const getFutureWeather = async (req, res) => {
  const { city, days } = req.query;

  try {
    const apiUrl = 'https://api.weatherapi.com/v1/forecast.json';
    const params = {
      q: city,
      days: days,
      key: process.env.WEATHER_API_KEY
    };

    const response = await axios.get(apiUrl, {
      params: params,
      headers: {
        'accept': 'application/json'
      }
    });

    const futureWeather = [];

    response.data.forecast.forecastday.forEach(item => {
      futureWeather.push({
        date: item.date,
        day: item.day,
        astro: item.astro
      })
    });

    const hourlyUpdate = [];

    // Access the 0th index of forecastday directly
    const hours = response.data.forecast.forecastday[0].hour;
    
    hours.forEach(item => {
      hourlyUpdate.push({
        temp: item.temp_c,
        time: item.time.split(" ")[1],
      });
    }) 
    

    res.json({
      location: response.data.location,
      futureWeather,
      hourlyUpdate
    })
  } catch (error) {
    console.error('Error fetching future weather data:', error);
    res.status(500).json({ message: 'Error fetching future weather data' });
  }
};