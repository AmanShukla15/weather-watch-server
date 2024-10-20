import Alert from '../models/Alert.js';
import { getCurrentWeather } from '../services/openWeatherService.js';

// Create a new weather alert
export const createAlert = async (req, res) => {
  const { city, thresholdTemp, condition } = req.body;
  try {
    const newAlert = await Alert.create({ city, thresholdTemp, condition });
    res.json({ message: 'Alert created successfully', newAlert });
  } catch (error) {
    res.status(500).json({ message: 'Error creating alert' });
  }
};

// Delete an alert
export const deleteAlert = async (req, res) => {
  const { id } = req.params;
  try {
    await Alert.findByIdAndDelete(id);
    res.json({ message: 'Alert deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting alert' });
  }
};

// Get all active alerts
export const getAllAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({ isActive: true });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching alerts' });
  }
};

// Check and trigger alerts
export const checkAndTriggerAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({ isActive: true });
    const triggeredAlerts = [];

    for (const alert of alerts) {
      const weatherData = await getCurrentWeather(alert.city);
      const currentTemp = weatherData.temperature;

      if (currentTemp > alert.thresholdTemp) {
        // Add triggered alert details to the response array
        triggeredAlerts.push({
          city: alert.city,
          currentTemp,
          thresholdTemp: alert.thresholdTemp,
        });

        // Remove the alert from the database after it's triggered
        await Alert.findByIdAndDelete(alert._id);
      }
    }

    // Return the triggered alerts data to the frontend
    if (triggeredAlerts.length > 0) {
      res.json({ message: 'Alerts triggered', triggeredAlerts });
    } else {
      res.json({ message: 'No alerts triggered' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error checking alerts', error });
  }
};
