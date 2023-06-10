import React, { useContext } from 'react'
import { ThemeContext } from '../App'
import './themebutton.css'
const ThemeButton = () => {

    const { theme, setTheme } = useContext(ThemeContext)
    return (
        <button className='themebutton' style={theme ? { backgroundColor: "#12343b" } : {}} onClick={() => setTheme(!theme)} >
            Change Theme
        </button>
    )
}

export default ThemeButton
