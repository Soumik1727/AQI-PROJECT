import React from 'react'
import './css/SearchBar.css'
import { IoSearch } from "react-icons/io5";
export default function SearchBar() {
    return (
        <div className="search-bar">
            <input type="text" placeholder="Search Location" className="search-input" />
            <button className="search-button"><IoSearch/></button>
        </div>
    )
}
