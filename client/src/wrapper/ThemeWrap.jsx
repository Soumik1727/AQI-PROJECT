import React, { use, useContext, useEffect, useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'

// Context setup
const themeContext = React.createContext()
export const useTheme = () => useContext(themeContext)

// MUI themes
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#14919b', // your custom primary color
    },
  },
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#14919b', // your custom primary color
    },
  },
})

export default function ThemeWrap({ children }) {
  const [themeData, sethemeData] = useState({
    mode: 'light',
    width: window.innerWidth,
  })

  // Handle window resize
  useEffect(() => {
    const updateWidth = () => {
      sethemeData(prev => ({
        ...prev,
        width: window.innerWidth,
      }))
    }
    window.addEventListener('resize', updateWidth)
    return () => {
      window.removeEventListener('resize', updateWidth)
    }
  }, [])

  // Change theme mode
  const changeMode = (mode) => {
    sethemeData(prev => ({
      ...prev,
      mode,
    }))
    localStorage.setItem('theme', mode)
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      sethemeData(prev => ({
        ...prev,
        mode: savedTheme,
      }))
    }
  }, [])

  // Optional: Set body class for global styles
  useEffect(() => {
    document.body.className = themeData.mode
    
  }, [themeData.mode])

  const currentTheme = themeData.mode === 'dark' ? darkTheme : lightTheme

  return (
    <themeContext.Provider value={{ ...themeData, changeMode }}>
      <ThemeProvider theme={currentTheme}>
        {children}
      </ThemeProvider>
    </themeContext.Provider>
  )
}
