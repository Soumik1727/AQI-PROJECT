import React from 'react'
import './css/AllParticles.css'
import { useWeather } from '../wrapper/weatherDataWrap'
export default function AllParticles() {
    const { weatherData } = useWeather()
    const  particles = [
        {name:'PM2.5',value:weatherData.pm2_5,unit:'µg/m³',img:'assets/pm25.svg',full_name:'Particulate Matter '},
        {name:'PM10',value:weatherData.pm10,unit:'µg/m³',img:'assets/pm10.svg',full_name:'Particulate Matter '},
        {name:'NO2',value:weatherData.no2,unit:'µg/m³',img:'assets/no2.svg',full_name:'Nitrogen Dioxide '},
        {name:'O3',value:weatherData.o3,unit:'µg/m³',img:'assets/o3.svg',full_name:'Ozone '},
        {name:'CO2',value:weatherData.co2,unit:'µg/m³',img:'assets/co2.png',full_name:'Carbon Dioxide'},
        {name:'CO',value:weatherData.co,unit:'µg/m³',img:'assets/co.svg',full_name:'Carbon Monoxide '},
        
    ]
    return (
        <div className='allps'>
            {particles.map((particle, index) => (
                <div className="pollutent" key={index}>
                    <img src={particle.img} alt="" />
                    <div className='name'>{particle.full_name} <br/> ({particle.name})</div>
                    <div className="amount">
                        <div className="value">{particle.value}</div>
                        <div className="unit">{particle.unit}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}
