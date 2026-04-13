import React from 'react';
import './WeatherCard.css';

interface WeatherCardProps {
  location: string;
  temperature?: number;
  label?: string;
  icon?: string;
  loading?: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ location, temperature = 0, label = '', icon = '', loading }) => {
  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Use standard Vite pattern for dynamic assets
  const iconUrl = new URL(`../../assets/images/icon-${icon}.webp`, import.meta.url).href;

  return (
    <div className="weather-card">
      <div className="weather-info">
        <div className="location-date">
          <h2>{location}</h2>
          <p className="date">{date}</p>
        </div>
        {loading ? (
          <div className="card-loading">
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        ) : (
          <div className="temp-display">
            <img src={iconUrl} alt={label} className="weather-large-icon" />
            <span className="temperature">{Math.round(temperature)}°</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;
