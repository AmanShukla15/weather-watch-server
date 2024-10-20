import Alert from '../models/Alert.js';
import { getCurrentWeather } from './openWeatherService.js';

// Function to check and trigger alerts
export const checkAndTriggerAlerts = async () => {
  try {
    const activeAlerts = await Alert.find({ isActive: true });
    for (const alert of activeAlerts) {
      const weatherData = await getCurrentWeather(alert.city);
      if (weatherData.temperature > alert.thresholdTemp) {
        console.log(`ALERT: ${alert.city} exceeded threshold!`);
        // Add code to trigger email or other notifications here
      }
    }
  } catch (error) {
    console.error('Error checking alerts:', error);
  }
};
