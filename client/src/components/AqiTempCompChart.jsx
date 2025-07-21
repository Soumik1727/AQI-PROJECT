import React from 'react'
import './css/AqiTempCompChart.css'
import { useWeather } from '../wrapper/weatherDataWrap'
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  Rectangle,
  ResponsiveContainer,
} from 'recharts';

export default function AqiTempCompChart() {
    const { historicalData } = useWeather()
        const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip-line">
                    <p className="label">{`${payload[0].payload.date}`}</p>
                    <p className="desc1">Aqi : {`${payload[0].value}`}</p>
                    <p className="desc2">Temp : {`${payload[1].value}`}</p>
                </div>
            );

        }

        return null;
    };
    return (
        <div className="aqi-temp-comp-chart-con">
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                    width={500}
                    height={400}
                    data={historicalData}
                    margin={{
                        top: 20,
                        right: 0,
                        bottom: 0,
                        left: 0,
                    }}
                >
                    
                    <XAxis dataKey="date" scale="band" />
                   
                    <Tooltip content={<CustomTooltip />} />
                    
                    <Legend />
                    <Bar dataKey="aqi"  fill="var(--primary-600)" radius={[6, 6, 0, 0]} activeBar={<Rectangle fill="var(--primary-900)"/>}/>
                    <Bar type="monotone"  dataKey="temperature" fill="rgb(255, 171, 3)" activeBar={<Rectangle fill="var(--primary-900)"/>}  radius={[6, 6, 0, 0]}/>
                    

                    {/* <Line type="monotone" dataKey="co" stroke="#ff7300" /> */}
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    )
}
