import React from 'react'
import './css/AqiPm2LineChart.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useWeather } from '../wrapper/weatherDataWrap'
export default function AqiPm2LineChart() {
    const { historicalData } = useWeather()
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip-line">
                    <p className="label">{`${payload[0].payload.date}`}</p>
                    <p className="desc1">Aqi : {`${payload[0].value}`}</p>
                    <p className="desc2">PM 2.5 : {`${payload[1].value}`}</p>
                </div>
            );

        }

        return null;
    };
    return (
        <div className='aqi-pm2-line-chart-con'>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={500}
                    height={300}
                    data={historicalData}
                    margin={{
                        top: 15,
                        right: 0,
                        left:0,
                        bottom: 0,
                    }}
                >
                    
                    <XAxis dataKey="date" />
                  
                   <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line type="monotone" dataKey="aqi" stroke="var(--primary-600)" activeDot={{ r: 4 }} strokeWidth={3} />
                    <Line type="monotone" dataKey="pm2_5" stroke="rgb(255, 171, 3)" strokeWidth={3}/>
                </LineChart>
            </ResponsiveContainer>
        </div>

    )
}
