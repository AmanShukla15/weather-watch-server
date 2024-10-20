import axios from 'axios';
import { City } from 'country-state-city';

const convertUnixToReadable = (unixTimestamp) => {
  const date = new Date(unixTimestamp * 1000);
  return date.toLocaleString();
};

// Function to get current weather from OpenWeatherMap API
const getCurrentWeather = async (city) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}`);
    const data = response.data;
    // Convert temperature from Kelvin to Celsius
    const tempCelsius = data.main.temp - 273.15;
    const feelsLikeCelsius = data.main.feels_like - 273.15;

    return {
      city: data.name,
      country: data.sys.country,
      coordinates: data.coord,
      temperature: tempCelsius.toFixed(2),
      feelsLike: feelsLikeCelsius.toFixed(2),
      temp_min: (data.main.temp_min - 273.15).toFixed(2),
      temp_max: (data.main.temp_max - 273.15).toFixed(2),
      pressure: data.main.pressure,
      humidity: data.main.humidity,
      wind: data.wind,
      clouds: data.clouds.all,
      visibility: `${data.visibility / 1000}`, // Converted to kilometers
      sunrise: convertUnixToReadable(data.sys.sunrise),
      sunset: convertUnixToReadable(data.sys.sunset),
      timestamp: convertUnixToReadable(data.dt),
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

// Helper function to get latitude and longitude from city name using OpenCage API
const getCoordinatesFromCity = (cityName, countryCode) => {
  try {
    const cities = City.getAllCities();

    // Find the city by name and country code
    const city = cities.find(
      (c) => c.name.toLowerCase() === cityName.toLowerCase() && c.countryCode === countryCode
    );

    if (!city) {
      throw new Error('City not found');
    }

    // Return the latitude and longitude
    return { latitude: parseFloat(city.latitude), longitude: parseFloat(city.longitude) };
  } catch (error) {
    console.error('Error fetching coordinates from city:', error);
    throw new Error('Failed to fetch coordinates');
  }
};

const getWeatherOfHistory = async (city, country, start, end) => {
  const formattedStartDate = formatDate(start);
  const formattedEndDate = formatDate(end);

  try {
    // Get latitude and longitude using the city and country
    const { latitude, longitude } = getCoordinatesFromCity(city, country);

    const apiUrl = 'https://api.weatherapi.com/v1/history.json';
    const params = {
      q: `${latitude},${longitude}`,
      dt: formattedStartDate,
      end_dt: formattedEndDate,
      key: process.env.WEATHER_API_KEY
    };

    const response = await axios.get(apiUrl, {
      params: params,
      headers: {
        'accept': 'application/json'
      }
    });

    const pastWeather = [];

    response.data.forecast.forecastday.forEach(item => {
      pastWeather.push({
        date: item.date,
        day: item.day,
        astro: item.astro
      })
    });

    return {
      location: response.data.location,
      pastWeather
    }
  } catch (error) {
    console.error('Error fetching historical weather data:', error);
    res.status(500).json({ message: 'Error fetching historical data' });
  }
}

const formatDate = (dateStr) => {
  const dateInt = parseInt(dateStr.replace(/-/g, ''), 10);
  const formattedDate = dateInt.toString().replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
  return formattedDate;
}

export {
  getCurrentWeather,
  getWeatherOfHistory
}