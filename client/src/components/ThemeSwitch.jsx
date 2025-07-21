import React from 'react'
import { useTheme } from '../wrapper/ThemeWrap'
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import './css/ThemeSwitch.css'
export default function ThemeSwitch() {
    const {mode,changeMode} = useTheme()
    const toggleDarkMode = ()=>{
        if (mode=='light') changeMode('dark')
        if (mode=='dark') changeMode('light')
    }
    return (
        <button className="theme-switch" onClick={toggleDarkMode}>
            {mode=='dark' && <MdLightMode/>}
            {mode=='light' && <MdDarkMode/>}
        </button>
    )
}
