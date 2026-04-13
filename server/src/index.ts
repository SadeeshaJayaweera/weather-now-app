import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import { getWeatherInfo } from './utils/weatherMapper';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Basic health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', developer: 'Sadeesha Jay' });
});

// Search route for geocoding
app.get('/api/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: 'Search query is required' });

    const response = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
      params: { name: q, count: 5, language: 'en', format: 'json' }
    });

    res.json(response.data.results || []);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Failed to fetch location search' });
  }
});

// Proxy route for weather data with transformation
app.get('/api/weather', async (req, res) => {
  try {
    const { latitude, longitude, tempUnit, windUnit, precipUnit } = req.query;
    
    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude,
        longitude,
        current_weather: true,
        hourly: 'temperature_2m,weather_code,precipitation_probability',
        daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,relative_humidity_2m_max,wind_speed_10m_max',
        temperature_unit: tempUnit || 'celsius',
        wind_speed_unit: windUnit || 'kmh',
        precipitation_unit: precipUnit || 'mm',
        timezone: 'auto'
      }
    });

    const data = response.data;
    
    // Transform current weather with our mapping
    const current = data.current_weather;
    const weatherInfo = getWeatherInfo(current.weathercode);

    const transformed = {
      ...data,
      current_weather: {
        ...current,
        weather_label: weatherInfo.label,
        weather_icon: weatherInfo.icon
      }
    };

    res.json(transformed);
  } catch (error) {
    console.error('Error fetching weather:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;
