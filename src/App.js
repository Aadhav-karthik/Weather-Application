import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { getWeatherData, fiveDayWeatherData } from './store/index';
import React, { useEffect, useState } from 'react';
import HeaderSection from './Components/HeaderSection';
import WeatherSection from './Components/WeatherSection';
import { fetchWeatherData } from './store/ComponentData/FetchData';

function App() {
  const weather = useSelector((state) => state.weatherData.cityWeatherData);
  const cities = useSelector((state => state.weatherData.cities));
  const weatherAPIData = useSelector((state) => state.weatherAPIData.data);
  const statusAPI = useSelector((state) => state.weatherAPIData.status);
  const message = useSelector((state) => state.weatherAPIData.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWeatherData(cities));
  }, [cities]);

  useEffect(() => {
    if (statusAPI === "fulfilled")
      dispatch(getWeatherData(weatherAPIData));
  }, [statusAPI]);

  useEffect(() => {
    if (statusAPI === "fulfilled")
      dispatch(fiveDayWeatherData());
  }, [weather])



  return (
        <div className="App">
          <HeaderSection />
          {weather?
            <WeatherSection />:<h4 className="loading-element">{message}</h4>
          }
          </div>
  );
}

export default App;
