import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router";
import ThemeWrap from './wrapper/ThemeWrap.jsx';
import WeatherDataWrap from './wrapper/weatherDataWrap.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeWrap>
        <WeatherDataWrap>
          <App />
        </WeatherDataWrap>
      </ThemeWrap>
    </BrowserRouter>
  </StrictMode>,
)
