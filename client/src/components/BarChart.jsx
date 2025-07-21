import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import React from 'react'
import './css/BarChart.css'
import { useWeather } from '../wrapper/weatherDataWrap'

export default function BarCharts() {
    const { historicalData } = useWeather()
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{`${payload[0].payload.date}`}</p>
                    <p className="desc">{`${payload[0].value}`}</p>
                    
                </div>
            );

        }

        return null;
    };
    return (
        <div className='bar-chart-con'>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={historicalData}
                    margin={{
                        top: 5,
                        right: 0,
                        left: 0,
                        bottom: 5,
                    }}
                >

                    <XAxis dataKey={'date'} />
                    
                    <Tooltip content={<CustomTooltip />} />

                    <Bar dataKey={historicalData[0]?.type} fill="var(--primary-600)" radius={[6, 6, 0, 0]} activeBar={<Rectangle fill="var(--primary-900)" />} />

                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
