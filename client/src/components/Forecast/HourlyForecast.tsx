import React from 'react';
import './HourlyForecast.css';
import WeatherIcon from '../Common/WeatherIcon';

interface HourlyForecastProps {
  hourly?: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
  };
  loading?: boolean;
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourly, loading }) => {
  // We'll show the next 24 hours
  const now = new Date();
  const next24Hours = hourly ? hourly.time
    .map((time, i) => ({ time, temp: hourly.temperature_2m[i], code: hourly.weather_code[i] }))
    .filter(item => new Date(item.time) > now)
    .slice(0, 8) : []; 

  return (
    <div className="hourly-forecast-section">
      <div className="hourly-header">
        <h3>Hourly forecast</h3>
        <select className="day-select">
          <option>Today</option>
          <option>Tomorrow</option>
        </select>
      </div>
      <div className="hourly-list">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="hourly-item loading">
              <div className="skeleton hour-skeleton"></div>
              <div className="skeleton icon-skeleton"></div>
              <div className="skeleton temp-skeleton"></div>
            </div>
          ))
        ) : next24Hours.map((item, i) => {
          const hour = new Date(item.time).toLocaleTimeString('en-US', { hour: 'numeric' });
          return (
            <div key={i} className="hourly-item">
              <WeatherIcon code={item.code} className="hourly-icon" />
              <span className="hour">{hour}</span>
              <span className="hourly-temp">{Math.round(item.temp)}°</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;
