import React, { useEffect, useState } from 'react'
import Display from '../components/display'
import './css/Home.css'
import { useWeather } from '../wrapper/weatherDataWrap'
import AllParticles from '../components/AllParticles'
import BarChart from '../components/BarChart'
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import axios from 'axios'
import AqiPm2LineChart from '../components/AqiPm2LineChart'
import AqiTempCompChart from '../components/AqiTempCompChart'

export default function Home() {
    const { weatherData, setHistoricalData } = useWeather()
    const [type, setType] = React.useState('aqi')
    const [dayLimit, setDayLimit] = useState(15)
    const handleChange = (event) => {
        setType(event.target.value);
    };
    const handleDayLimit = (event) => {
        setDayLimit(event.target.value);
    };

    // Dynamic Recommendations based on AQI, Temperature, Humidity
    const getRecommendation = () => {
        const recs = [];
        const AQI = weatherData.aqi
        const Temperature = weatherData.temperature
        const Humidity = weatherData.humidity
        // AQI recommendations
        if (AQI <= 50 && AQI > 0) {
            recs.push({ head: ' Good Air Quality', text: "Perfect for outdoor activities!" });
        } else if (AQI <= 103) {
            recs.push({ head: ' Moderate Air Quality', text: "Sensitive individuals should be cautious." });
        } else if (AQI > 100) {
            recs.push({ head: ' Poor Air Quality', text: "Limit outdoor activities and wear a mask." });
        } else {
            recs.push({ head: ' Air Quality Info Not Available', text: "" });
        }

        // Temperature recommendations
        if (Temperature >= 35) {
            recs.push({ head: ' High Temperature', text: "Stay hydrated and avoid the sun." });
        } else if (Temperature <= 10 && Temperature > 0) {
            recs.push({ head: ' Low Temperature', text: "Keep yourself warm with proper clothing." });
        } else if (Temperature > 10 && Temperature < 35) {
            recs.push({ head: ' Comfortable Temperature', text: "No special precautions needed." });
        } else {
            recs.push({ head: ' Temperature Info Not Available', text: "" });
        }

        // Humidity recommendations
        if (Humidity >= 70) {
            recs.push({ head: ' High Humidity', text: "It might feel sticky; stay cool and ventilated." });
        } else if (Humidity <= 30 && Humidity > 0) {
            recs.push({ head: ' Low Humidity', text: "Dry air detected. Use a humidifier indoors if needed." });
        } else if (Humidity > 30 && Humidity < 70) {
            recs.push({ head: ' Ideal Humidity', text: "You’ll feel comfortable." });
        } else {
            recs.push({ head: ' Humidity Info Not Available', text: "" });
        }

        return recs;
    };

  

    useEffect(() => {
        const getHistoricalData = async () => {
            try {
                const fdata = await axios({
                    method: 'get',
                    url: 'https://air-quality-monitoring-tvg8.onrender.com/api/aqi/history?',
                    params: {
                        zone: weatherData.zone,
                        daysLimit: dayLimit,
                    }
                })
                const list = Object.entries(fdata.data).map(([date, values]) => ({
                    date,
                    type,
                    ...values,
                }))
                setHistoricalData(list)
            } catch (error) {
                console.error("Error fetching historical data:", error);
            }
        }
        getHistoricalData()
    }, [type, dayLimit, weatherData.zone, setHistoricalData])

    return (
        <div className='home'>
            <div className="title">
                <h1>Jadavpur Air Quality Index (AQI) | Air Pollution</h1>
                <h3 style={{ color: 'gray' }}>Real-time PM2.5, PM10 air pollution level in Jadavpur</h3>
                <p  >Last Updated : {new Date(weatherData.timestamp).toDateString()} (Local Time)</p>
            </div>
            <Display />

            <div className="particles">
                <h3>Major Air Pollutants</h3>
                <p>Jadavpur</p>

            </div>
            <AllParticles />

            <div className="chert">
                <div className='chert-title'>
                    <p>AQI Graph</p>
                    <h3>Historical Air Quality Data</h3>
                </div>
                <div className='filter'>
                    <FormControl sx={{ m: 1, minWidth: 120, fontSize: '.8rem' }} size="small" >
                        <InputLabel id="type">Select type</InputLabel>
                        <Select
                            labelId="type"
                            id="select-type"
                            value={type}
                            label="Select type"
                            onChange={handleChange}
                        >
                            <MenuItem value={'aqi'}>AQI</MenuItem>
                            <MenuItem value={'pm10'}>PM 10</MenuItem>
                            <MenuItem value={'pm2_5'}>PM 2.5</MenuItem>
                            <MenuItem value={'no2'}>No 2</MenuItem>
                            <MenuItem value={'o3'}>O 3</MenuItem>
                            <MenuItem value={'co'}>CO</MenuItem>
                            <MenuItem value={'humidity'}>Humidity</MenuItem>
                            <MenuItem value={'temperature'}>Temperature</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 150, fontSize: '.8rem' }} size="small" >
                        <InputLabel id="day">day limit</InputLabel>
                        <Select
                            labelId="day"
                            id="select-day"
                            value={dayLimit}
                            label="Select type"
                            onChange={handleDayLimit}
                        >
                            <MenuItem value={'7'}>last 7 days</MenuItem>
                            <MenuItem value={'15'}>last 15 days</MenuItem>
                            <MenuItem value={'30'}>last month</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <BarChart />

            <div className="recom_con">
                <p>Recommendations Based on your Air Quality readings:</p>
                <div className="recom">
                    {getRecommendation().map((rec, index) => (
                        <div key={index}>
                            <h3>{rec.head}</h3>
                            <p>{rec.text}</p>
                        </div>
                    ))}
                </div>

            </div>
            <div className="chert">
                <div className='chert-title'>
                    <p>Trends Over Time</p>
                    <h3>AQI and PM2.5</h3>
                    <p> Temporal variation of the Air Quality Index (AQI)
                        along with PM2.5 concentrations</p>
                </div>
                <div className='filter'>

                    <FormControl sx={{ m: 1, minWidth: 150, fontSize: '.8rem' }} size="small" >
                        <InputLabel id="day">day limit</InputLabel>
                        <Select
                            labelId="day"
                            id="select-day"
                            value={dayLimit}
                            label="Select type"
                            onChange={handleDayLimit}
                        >
                            <MenuItem value={'7'}>last 7 days</MenuItem>
                            <MenuItem value={'15'}>last 15 days</MenuItem>
                            <MenuItem value={'30'}>last month</MenuItem>
                        </Select>
                    </FormControl>
                </div>

            </div>
            <AqiPm2LineChart />
            <div className="chert">
                <div className='chert-title'>
                    <p>AQI and Temperature</p>
                    <p>Comparative analysis between AQI and temperature values</p>
                </div>
                <div className='filter'>

                    <FormControl sx={{ m: 1, minWidth: 150, fontSize: '.8rem' }} size="small" >
                        <InputLabel id="day">day limit</InputLabel>
                        <Select
                            labelId="day"
                            id="select-day"
                            value={dayLimit}
                            label="Select type"
                            onChange={handleDayLimit}
                        >
                            <MenuItem value={'7'}>last 7 days</MenuItem>
                            <MenuItem value={'15'}>last 15 days</MenuItem>
                            <MenuItem value={'30'}>last month</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <AqiTempCompChart />
        </div>
    )
}
