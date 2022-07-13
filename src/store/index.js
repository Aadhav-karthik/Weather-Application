import { weatherSlice } from "./ComponentData/weatherData";
import { configureStore } from '@reduxjs/toolkit'
import { weatherAPISlice } from './ComponentData/FetchData'


export const { changeSelectedCity, getWeatherData, fiveDayWeatherData, selectWeatherDay, getSelectedDay } = weatherSlice.actions;


export const store = configureStore({
  reducer: {
    weatherData: weatherSlice.reducer,
    weatherAPIData: weatherAPISlice.reducer,
  }
})