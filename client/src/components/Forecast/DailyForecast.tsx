import React from 'react';
import './DailyForecast.css';
import WeatherIcon from '../Common/WeatherIcon';

interface DayForecastProps {
  date: string;
  code: number;
  max: number;
  min: number;
}

const DayCard: React.FC<DayForecastProps> = ({ date, code, max, min }) => {
  const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
  
  return (
    <div className="day-card">
      <span className="day-name">{dayName}</span>
      <WeatherIcon code={code} className="forecast-icon" />
      <div className="day-temps">
        <span className="high">{Math.round(max)}°</span>
        <span className="low">{Math.round(min)}°</span>
      </div>
    </div>
  );
};

interface DailyForecastProps {
  daily?: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
  loading?: boolean;
}

const DailyForecast: React.FC<DailyForecastProps> = ({ daily, loading }) => {
  return (
    <div className="daily-forecast-section">
      <h3>Daily forecast</h3>
      <div className="daily-forecast-grid">
        {loading ? (
          Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="day-card loading">
              <div className="skeleton day-skeleton"></div>
              <div className="skeleton icon-skeleton"></div>
              <div className="skeleton temp-skeleton"></div>
            </div>
          ))
        ) : daily ? (
          daily.time.map((time, i) => (
            <DayCard 
              key={time}
              date={time}
              code={daily.weather_code[i]}
              max={daily.temperature_2m_max[i]}
              min={daily.temperature_2m_min[i]}
            />
          ))
        ) : null}
      </div>
    </div>
  );
};

export default DailyForecast;
