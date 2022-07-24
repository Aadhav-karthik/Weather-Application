import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedDay } from '../store';
import  FiveDayWeatherSection  from './WeatherSections/FiveDayWeatherSection';
import OneDayWeatherSection from './WeatherSections/OneDayWeatherSection';

function WeatherSection(props){
    const oneDayWeather = useSelector((state) => state.weatherData.oneDayWeatherData);
    const fiveDayWeather = useSelector((state) => state.weatherData.fiveDayWeatherData);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSelectedDay());
    }, [fiveDayWeather]);

    return (
        <section className="container">
        <div className="row mt-md-3 pt-2 pt-md-0 mt-5 text-start">
        <FiveDayWeatherSection/>
        {Object.keys(oneDayWeather).length !== 0 ? <OneDayWeatherSection/> : null}
        </div> 
        </section>
    )

}

export default WeatherSection;