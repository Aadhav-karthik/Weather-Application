import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { coordinates } from '../../External/CityCoordinates';

export const fetchWeatherData = createAsyncThunk(
    "weatherAPISlice/getWeatherData",
    async (cities) => {
        let cityID = null;
        cities.map((city) => {
            if (city.selected === true)
                cityID = city.id;
        });

        const fetchUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates[cityID].lat}&lon=${coordinates[cityID].lon}&appid=`;
        
        return await fetch(fetchUrl + process.env.REACT_APP_API_KEY).then(response => {
            if (response.status === 404)
                throw new Error("Server Responded with Error");
            return response.json();
        });

    }
)

export const weatherAPISlice = createSlice({
    name: 'weatherData',
    initialState: { data: {}, status: null, error:null },
    extraReducers: {
        [fetchWeatherData.pending]: (state, action) => {
            state.status = "pending";
            state.error = "Loading...";
        },

        [fetchWeatherData.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            state.data = action.payload;
        },

        [fetchWeatherData.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = "Server Responded with Error. Please try again later.";
        }
    }
}
)


