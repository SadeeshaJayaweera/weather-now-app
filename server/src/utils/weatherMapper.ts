export interface WeatherInfo {
  label: string;
  icon: string;
}

export const weatherMap: Record<number, WeatherInfo> = {
  0: { label: 'Sunny', icon: 'sunny' },
  1: { label: 'Mainly Clear', icon: 'partly-cloudy' },
  2: { label: 'Partly Cloudy', icon: 'partly-cloudy' },
  3: { label: 'Overcast', icon: 'overcast' },
  45: { label: 'Fog', icon: 'fog' },
  48: { label: 'Depositing Rime Fog', icon: 'fog' },
  51: { label: 'Drizzle: Light', icon: 'drizzle' },
  53: { label: 'Drizzle: Moderate', icon: 'drizzle' },
  55: { label: 'Drizzle: Dense', icon: 'drizzle' },
  61: { label: 'Rain: Slight', icon: 'rain' },
  63: { label: 'Rain: Moderate', icon: 'rain' },
  65: { label: 'Rain: Heavy', icon: 'rain' },
  71: { label: 'Snow: Slight', icon: 'snow' },
  73: { label: 'Snow: Moderate', icon: 'snow' },
  75: { label: 'Snow: Heavy', icon: 'snow' },
  95: { label: 'Thunderstorm', icon: 'storm' },
};

export const getWeatherInfo = (code: number): WeatherInfo => {
  return weatherMap[code] || { label: 'Unknown', icon: 'overcast' };
};
