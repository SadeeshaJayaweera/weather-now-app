import React from 'react';
import './WeatherStats.css';

interface StatProps {
  label: string;
  value: string | number;
  unit: string;
}

const Stat: React.FC<StatProps> = ({ label, value, unit }) => (
  <div className="stat-item">
    <span className="stat-label">{label}</span>
    <span className="stat-value">{value}{unit}</span>
  </div>
);

interface WeatherStatsProps {
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  loading?: boolean;
  windUnit: string;
  precipUnit: string;
}

const WeatherStats: React.FC<WeatherStatsProps> = ({ feelsLike, humidity, windSpeed, precipitation, loading, windUnit, precipUnit }) => {
  return (
    <div className="weather-stats-grid">
      <Stat label="Feels Like" value={loading ? '--' : Math.round(feelsLike)} unit="°" />
      <Stat label="Humidity" value={loading ? '--' : humidity} unit="%" />
      <Stat label="Wind Speed" value={loading ? '--' : windSpeed} unit={windUnit} />
      <Stat label="Precipitation" value={loading ? '--' : precipitation} unit={precipUnit} />
    </div>
  );
};

export default WeatherStats;
