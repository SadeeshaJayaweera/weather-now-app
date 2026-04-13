import React from 'react';

// Mapping based on Open-Meteo weather codes
export const weatherCodes: Record<number, { label: string, icon: string }> = {
  0: { label: 'Sunny', icon: 'sunny' },
  1: { label: 'Mainly Clear', icon: 'partly-cloudy' },
  2: { label: 'Partly Cloudy', icon: 'partly-cloudy' },
  3: { label: 'Overcast', icon: 'overcast' },
  45: { label: 'Fog', icon: 'fog' },
  48: { label: 'Fog', icon: 'fog' },
  51: { label: 'Drizzle', icon: 'drizzle' },
  53: { label: 'Drizzle', icon: 'drizzle' },
  55: { label: 'Drizzle', icon: 'drizzle' },
  61: { label: 'Rain', icon: 'rain' },
  63: { label: 'Rain', icon: 'rain' },
  65: { label: 'Rain', icon: 'rain' },
  71: { label: 'Snow', icon: 'snow' },
  73: { label: 'Snow', icon: 'snow' },
  75: { label: 'Snow', icon: 'snow' },
  95: { label: 'Thunderstorm', icon: 'storm' },
};

interface WeatherIconProps {
  code: number;
  className?: string;
  isLarge?: boolean;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ code, className, isLarge }) => {
  const info = weatherCodes[code] || { label: 'Unknown', icon: 'overcast' };
  const iconFileName = `icon-${info.icon}.webp`;
  
  return (
    <img 
      src={new URL(`../../assets/images/${iconFileName}`, import.meta.url).href} 
      alt={info.label} 
      className={className}
      width={isLarge ? 120 : 40}
    />
  );
};

export default WeatherIcon;
