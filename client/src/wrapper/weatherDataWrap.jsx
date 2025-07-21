import React, { useContext, useState } from 'react'

// Context setup
const weatherContext = React.createContext()
export const useWeather = () => useContext(weatherContext)

export default function WeatherDataWrap({ children }) {
    const [weatherData, setWeatherData] = useState({
        zone: "Zone A",
        temperature: 30,
        humidity: 45,
        co2: 400,
        co: 0.8,
        o3: 0.03,
        no2: 0.01,
        pm2_5: 55,
        pm10: 80,
        aqi: 120,
        timestamp: "2025-05-09T10:30:00.000Z"
    })
    const [historicalData, setHistoricalData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
  
    return (
        <weatherContext.Provider value={{weatherData, setWeatherData,historicalData, setHistoricalData, isLoading, setIsLoading}}>
            {children}
        </weatherContext.Provider>
    )
}
