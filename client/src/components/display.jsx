import React from 'react'
import { useWeather } from '../wrapper/weatherDataWrap'
import './css/display.css'
export default function Display() {
    const { weatherData } = useWeather()
    const getAQIStatus = (aqi) => {
        if (aqi <= 50) return "Good";
        if (aqi <= 100) return "Moderate";
        if (aqi <= 150) return "Poor";
        if (aqi <= 200) return "Unhealthy";
        if (aqi <= 300) return "Severe";
        return "Hazardous";
    };

    const getRecommendation = (status) => {
        switch (status) {
            case "Good": return "Air quality is good. Enjoy your outdoor activities!";
            case "Moderate": return "Air quality is acceptable. Sensitive individuals should be careful.";
            case "Poor": return "Reduce prolonged or heavy exertion outdoors.";
            case "Unhealthy": return "Avoid outdoor activities if possible.";
            case "Severe": return "Stay indoors and keep windows closed.";
            case "Hazardous": return "Health warnings of emergency conditions.";
            default: return "";
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Good": return "#00e400";
            case "Moderate": return "#ffff00";
            case "Poor": return "#ff7e00";
            case "Unhealthy": return "#ff0000";
            case "Severe": return "#99004c";
            case "Hazardous": return "#7e0023";
            default: return "#999";
        }
    };
    return (
        <div className="banner">
            <div className="section1">
                <div className='aqi-card'>
                    <div>
                        <div className="t"><div style={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            backgroundColor: "#25D366",
                            animation: "blink 1.5s ease-in-out infinite",
                        }}></div>Live AQI</div>
                        <div className='aqi' style={{ '--color': getStatusColor(getAQIStatus(weatherData.aqi)) }}>{weatherData.aqi}</div>
                    </div>
                    <div >
                        <div className="t aq">Air Quality is</div>
                        <div className='status' style={{ '--color': getStatusColor(getAQIStatus(weatherData.aqi)) }}>
                            {getAQIStatus(weatherData.aqi)}
                        </div>
                    </div>
                </div>
                <div>
                    <div className='pm'>
                        <div>
                            <div className="t">PM2.5 : </div>
                            <div className='pm-value'> {weatherData.pm2_5} µg/m³</div>
                        </div>
                        <div>
                            <div className="t">PM10 : </div>
                            <div className='pm-value'> {weatherData.pm10} µg/m³</div>
                        </div>
                    </div>

                </div>
                <div>
                    <div style={{ marginTop: "2rem" }}>
                        <div style={{
                            position: "relative",
                            height: "8px",
                            width: "100%",  // Reduced width
                            margin: "0 auto",
                            borderRadius: "5px",
                            background: "linear-gradient(to right, #00e400 0% , #ffff00 16%, #ff7e00 33%, #ff0000 50%, #99004c 66%, #7e0023 83%)",
                            marginBottom: "0.5rem"
                        }}>
                            <div style={{
                                position: "absolute",
                                top: "-3px",
                                left: `${(weatherData.aqi > 300 ? 100 : (weatherData.aqi / 300) * 100)}%`,
                                transform: "translateX(-50%)",
                                width: "12px",
                                height: "12px",
                                backgroundColor: "#fff",
                                border: "1px solid gray",
                                borderRadius: "50%",
                            }}></div>
                        </div>
                        <div style={{ width: "100%", margin: "0 auto", display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "#999" }}>
                            <div>0</div><div>50</div><div>100</div><div>150</div><div>200</div><div>300+</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="recommendation">
                        ℹ️ {getRecommendation(getAQIStatus(weatherData.aqi))}
                    </div>
                </div>
            </div>
            <div className="section2">
                <div className="card" style={{ '--color': getStatusColor(getAQIStatus(weatherData.aqi)) }}>
                    <div className="temp">

                        <img width="32" height="32" src="https://img.icons8.com/nolan/64/temperature.png" alt="temperature" />
                        {weatherData.temperature}°C
                    </div>
                    <div className="other">
                        <div className="hum">
                            <div className="t">
                                <img width="48" height="48" src="src/assets/humidity.svg" alt="wet" /> 
                                Humidity
                            </div>

                            {weatherData.humidity}%
                        </div>
                        <div className="co2">
                            <div className="t"> 
                                <img width="50" height="50" src="src\assets\co2.png" alt="co2" />
                                 Co2
                                 </div>
                            {weatherData.co2} ppm
                        </div>
                        <div className="no2">
                            <div className="t">
                                <img width="50" height="50" src="src\assets\no2.svg" alt="nitrogen-dioxide" />
                                 No2
                                 </div>

                            {weatherData.no2} ppm
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg" style={{ '--image': `url(src/assets/${getAQIStatus(weatherData.aqi)}.jpg)` }}>

            </div>
        </div>
    )
}
