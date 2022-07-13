import "../CSS/WeatherIcons.css";
import React from 'react';

export const weatherIcon = {
    HUMIDITY: <i className="humidity fa-solid fa-droplet"></i>,
    WIND: <i className="wind fa-solid fa-wind"></i>,
    WINDDIRECTION: <i className="fa-solid fa-arrow-right"></i>,
    PRESSURE: <i className="pressure fa-solid fa-weight-scale"></i>,
    TEMPERATURE: <i className="fa-solid fa-temperature-high"></i>,
    CLOUD: <i className="fa-solid fa-cloud"></i>,
    VISIBILITY: <i className="fa-solid fa-eye-low-vision"></i>,
    RAIN: <i className="fa-solid fa-cloud-showers-heavy"></i>
}

export const WeatherIcon = ({ weather }) => {

    if (weather.toLowerCase().includes('clouds'))
        return <i className="clouds fa-solid fa-cloud"></i>;

    if (weather.toLowerCase().includes('rain'))
        return <i className="rain fa-solid fa-cloud-rain"></i>;

    if (weather.toLowerCase().includes('snow'))
        return <i className="snow fa-solid fa-snowflake"></i>;

    else
        return <i className="clear fa-solid fa-sun"></i>;
}