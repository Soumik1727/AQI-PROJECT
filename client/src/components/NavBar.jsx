import React, { useState, useEffect, useRef, use } from 'react'
import './css/NavBar.css'
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { NavLink } from 'react-router-dom'
import { HiMenu } from "react-icons/hi";
import ThemeSwitch from './themeSwitch';
import { IoClose } from "react-icons/io5";
import axios from 'axios';
import { useWeather } from '../wrapper/weatherDataWrap';
export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [zoneAq, setZone] = React.useState('');

    const handleChange = (event) => {
        setZone(event.target.value);
    };
    const navBarRef = useRef(null)
    useEffect(() => {
        const closeContextMenu = (e) => {
            if (navBarRef.current && !navBarRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        }
        if (isOpen) {
            // Adding a slight delay to ensure the event doesn't trigger on the same click that opens the menu
            setTimeout(() => {
                // document.addEventListener('click', closeContextMenu);
                document.addEventListener('scroll', closeContextMenu, true);
            }, 0);
        }
        return () => {
            // document.removeEventListener('click', closeContextMenu);
            document.removeEventListener('scroll', closeContextMenu, true);
        }

    }, [isOpen]);
    const {setWeatherData, setIsLoading } = useWeather()
    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true)
                const fdata = await axios({
                        method: 'get',
                        url: 'https://air-quality-monitoring-tvg8.onrender.com/api/aqi/latest?',
                        params: {
                            zone: zoneAq
                        }
                    })
                let {zone, temperature, humidity, co2, co, o3, no2, pm2_5, pm10, aqi, timestamp} = fdata.data
                temperature = Math.round(temperature)
                humidity = Math.round(humidity)
                co2 = co2.toFixed(2)
                co = co.toFixed(2)
                o3 = o3.toFixed(2)
                no2 = no2.toFixed(2)
                pm2_5 = Math.round(pm2_5)
                pm10 = Math.round(pm10)
                aqi = Math.round(aqi)

                setWeatherData({zone, temperature, humidity, co2, co, o3, no2, pm2_5, pm10, aqi, timestamp})
                setIsLoading(false)
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
       getData()
    },[zoneAq])

    return (
        <div className='nav-bar' ref={navBarRef}>
            <div className="menu">
                {isOpen ? <IoClose onClick={() => setIsOpen(!isOpen)} />
                    : <HiMenu className="menu-icon" onClick={() => setIsOpen(!isOpen)} />
                }

            </div>
            <div className="name">
                AQI
            </div>

            <div className={`menu-items ${isOpen ? 'opened' : 'closed'}`}>
                <FormControl sx={{ m: 1, minWidth: 180,fontSize:'.8rem'}} size="small" >
                    <InputLabel id="select-small-label">Select Zone</InputLabel>
                    <Select
                        labelId="select-small-label"
                        id="select-small"
                        value={zoneAq}
                        label="Select Zone"
                        onChange={handleChange}
                        
                    >
                        <MenuItem value="">None</MenuItem>
    
                        <MenuItem value={'Zone A'}>Zone A</MenuItem>
                        <MenuItem value={'Zone B'}>Zone B</MenuItem>
                        <MenuItem value={'Zone C'}>Zone C</MenuItem>
                        <MenuItem value={'Zone D'}>Zone D</MenuItem>
                        <MenuItem value={'Zone E'}>Zone E</MenuItem>
                        <MenuItem value={'Zone F'}>Zone F</MenuItem>
                        <MenuItem value={'Zone G'}>Zone G</MenuItem>
                        <MenuItem value={'Zone H'}>Zone H</MenuItem>
                        <MenuItem value={'Zone I'}>Zone I</MenuItem>
                      
                    </Select>
                </FormControl>

                <div className="links" onClick={() => setIsOpen(false)}>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/store">Store</NavLink>
                    <NavLink to="/stats">Stats</NavLink>
                </div>

            </div>
            <div className="theme-toggle">
                <ThemeSwitch />
            </div>

        </div>
    )
}
