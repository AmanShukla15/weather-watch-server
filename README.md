
# Weather Watch Backend 🌦️

This is the backend server for the **Weather Watch** platform, responsible for fetching weather data, handling API requests, and storing user preferences. It is built using **Express.js**, **Node.js**, and **MongoDB**.

## 🚀 Live Project Link

The backend is deployed and running on Render.

- **Deployed Backend**: [Weather Watch Backend](https://weather-watch-frontend.onrender.com/)

---

## 🛠️ Technologies Used

### Backend:
- **Express.js**: A web framework for Node.js to handle routing and API calls.
- **Node.js**: JavaScript runtime used for building fast and scalable server-side applications.
- **MongoDB**: NoSQL database used for storing weather data, user alerts, and preferences.

### API Integration:
- **OpenWeatherMap API**: Integrated for fetching real-time, historical, and future weather forecasts.

---

## ⚙️ How to Run the Backend Locally

Follow the steps below to set up and run the backend server on your local machine:

### 1. Clone the repository
```bash
git clone https://github.com/AmanShukla15/weather-watch-server.git
```

### 2. Navigate to the project directory
```bash
cd weather-watch-server
```

### 3. Install dependencies
Make sure you have **Node.js** and **npm** installed on your system. Then, install the required dependencies using the command:
```bash
npm install
```


### 5. Run the server
Once everything is set up, you can start the server with the following command:
```bash
npm start
```

### 6. Access the backend
The backend will run on `http://localhost:5000` by default. You can now test the API endpoints locally.

---

## 📂 API Endpoints

### 1. Get Current Weather
- **GET** `/weather/current/:city`
  - Fetch the current weather for a specified city.

### 2. Get Historical Weather
- **GET** `/weather/history`
  - Fetch historical weather data for a specified location and date range.

### 3. Get Future Weather Forecast
- **GET** `/weather/forecast`
  - Fetch the future weather forecast for a specified city and number of days.

---

## 🗄️ Database

The backend uses **MongoDB** to store:
- User-defined alerts and temperature thresholds.
- User preferences and location details.

Ensure that you have a running MongoDB instance and provide the correct MongoDB URI in the `.env` file.

---
