import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import './App.css'

// Internal components
import Header from './components/Header/Header'
import Search from './components/Search/Search'
import WeatherCard from './components/WeatherCard/WeatherCard'
import WeatherStats from './components/WeatherStats/WeatherStats'
import DailyForecast from './components/Forecast/DailyForecast'
import HourlyForecast from './components/Forecast/HourlyForecast'

import { LoadingState, ErrorState, NoResultsState } from './components/Common/States'

function App() {
  const [weather, setWeather] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [noResults, setNoResults] = useState(false)
  const [location, setLocation] = useState({ name: 'Berlin, Germany', lat: 52.52, lon: 13.41 })
  
  const [tempUnit, setTempUnit] = useState<'celsius' | 'fahrenheit'>('celsius')
  const [windUnit, setWindUnit] = useState<'kmh' | 'mph'>('kmh')
  const [precipUnit, setPrecipUnit] = useState<'mm' | 'inch'>('mm')

  const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

  const fetchWeather = useCallback(async (lat: number, lon: number) => {
    setLoading(true)
    setError(null)
    setNoResults(false)
    try {
      const response = await axios.get(`${API_BASE}/api/weather`, {
        params: { 
          latitude: lat, 
          longitude: lon, 
          tempUnit,
          windUnit,
          precipUnit
        }
      })
      setWeather(response.data)
    } catch (err) {
      setError('We couldn\'t connect to the server (API error). Please try again in a few moments.')
    } finally {
      setLoading(false)
    }
  }, [tempUnit, windUnit, precipUnit])

  useEffect(() => {
    fetchWeather(location.lat, location.lon)
  }, [fetchWeather, location])

  const handleSearch = async (query: string) => {
    try {
      setLoading(true)
      setNoResults(false)
      const searchResponse = await axios.get(`${API_BASE}/api/search`, { params: { q: query } })
      if (searchResponse.data && searchResponse.data.length > 0) {
        const bestMatch = searchResponse.data[0]
        setLocation({
          name: `${bestMatch.name}, ${bestMatch.country}`,
          lat: bestMatch.latitude,
          lon: bestMatch.longitude
        })
      } else {
        setNoResults(true)
        setLoading(false)
      }
    } catch (err) {
      setError('Search failed. Please try again.')
      setLoading(false)
    }
  }

  const handleLocationSelect = (loc: { name: string, lat: number, lon: number }) => {
    setLocation(loc)
  }


  return (
    <div className="app-container">
      <Header 
        tempUnit={tempUnit} 
        windUnit={windUnit} 
        precipUnit={precipUnit}
        onTempChange={setTempUnit}
        onWindChange={setWindUnit}
        onPrecipChange={setPrecipUnit}
      />
      
      <main>
        <Search onSearch={handleSearch} onLocationSelect={handleLocationSelect} />
        
        {error && <ErrorState message={error} onRetry={() => fetchWeather(location.lat, location.lon)} />}
        {noResults && !loading && !error && <NoResultsState />}
        
        {(loading || (weather && !error && !noResults)) && (
          <div className="main-content">
            <div className="weather-overview">
              <WeatherCard 
                location={location.name}
                temperature={weather?.current_weather?.temperature}
                label={weather?.current_weather?.weather_label}
                icon={weather?.current_weather?.weather_icon}
                loading={loading}
              />
              
              <WeatherStats 
                feelsLike={weather?.current_weather?.temperature || 0}
                humidity={weather?.daily?.relative_humidity_2m_max?.[0] || 0}
                windSpeed={weather?.daily?.wind_speed_10m_max?.[0] || 0}
                precipitation={weather?.daily?.precipitation_sum?.[0] || 0}
                loading={loading}
                windUnit={windUnit === 'kmh' ? ' km/h' : ' mph'}
                precipUnit={precipUnit === 'mm' ? ' mm' : ' in'}
              />
              
              <DailyForecast daily={weather?.daily} loading={loading} />
            </div>
            
            <aside className="sidebar">
              <HourlyForecast hourly={weather?.hourly} loading={loading} />
            </aside>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
