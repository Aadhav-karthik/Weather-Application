import { createSlice } from '@reduxjs/toolkit';
import { coordinates } from '../../External/CityCoordinates';

const initialState = {
    cityWeatherData: null, fiveDayWeatherData: {}, oneDayWeatherData: {}, cities: coordinates, city: 'Chennai',
};

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {

        changeSelectedCity(state, action) {
            state.cities.forEach(city => {
                if (action.payload === city.id) {
                    city.selected = true;
                    state.city = city.name;
                }
                else {
                    city.selected = false;
                }

            })
        },

        getWeatherData(state, action) {
            state.cityWeatherData = action.payload;
        },

        fiveDayWeatherData(state, action) {
            state.fiveDayWeatherData = dayWiseSpecificData(state.cityWeatherData.list)
        },

        selectWeatherDay(state, action) {
            for (let key in state.fiveDayWeatherData) {

                if (key === action.payload)
                    state.fiveDayWeatherData[key].selected = true;
                else
                    state.fiveDayWeatherData[key].selected = false;
            }
        },

        getSelectedDay(state, action) {
            for (let key in state.fiveDayWeatherData) {
                if (state.fiveDayWeatherData[key].selected === true) {
                    state.oneDayWeatherData = {};
                    state.oneDayWeatherData[key] = dayWiseWeatherData(state.cityWeatherData.list)[key];
                }
            }
        }
    }
})

function dayWiseWeatherData(weatherData) {
    const weatherDataDates = weatherData.reduce((arr, item) => {
        const date = item["dt_txt"];
        if (!arr[new Date(date).toLocaleDateString()]) {
            arr[new Date(date).toLocaleDateString()] = [];
        }
        arr[new Date(date).toLocaleDateString()].push(item);
        return arr;
    }, {}
    );

    for (let key in weatherDataDates) {
        if (weatherDataDates[key].length < 4) {
            delete weatherDataDates[key];
        }
    }

    return weatherDataDates;
}

function dayWiseSpecificData(weatherData) {
    const weatherDataDates = dayWiseWeatherData(weatherData);
    const acc = {};

    for (const key in weatherDataDates) {
        acc[key] = {};
        const temps = [], description = [], humidity = [], wind = [], tempFeel = [], visibility = [],
            clouds = [], pop = [], gust = [], pressure = [];

        // eslint-disable-next-line array-callback-return
        weatherDataDates[key].map((item) => {
            temps.push(item.main.temp);
            description.push(item.weather[0].description);
            humidity.push(item.main.humidity);
            wind.push(item.wind.speed);
            tempFeel.push(item.main.feels_like);
            visibility.push(item.visibility);
            clouds.push(item.clouds.all);
            pop.push(item.pop);
            gust.push(item.wind.gust);
            pressure.push(item.main.pressure);
        })

        acc[key]["maxTemp"] = (Math.max(...temps) - 273.15).toFixed(0);
        acc[key]["minTemp"] = (Math.min(...temps) - 273.15).toFixed(0);
        acc[key]["description"] = findFrequentElement(description);
        acc[key]["humidity"] = (humidity.reduce((average, item) => { return average += item; }, 0) / humidity.length).toFixed(0);
        acc[key]["windSpeed"] = ((wind.reduce((average, item) => { return average += item; }, 0) / wind.length) * 3.6).toFixed(0);
        acc[key]["tempFeel"] = (tempFeel.reduce((average, item) => { return average += item; }, 0) / tempFeel.length - 273).toFixed(0);
        acc[key]["visibility"] = (visibility.reduce((average, item) => { return average += item; }, 0) / (visibility.length * 1000)).toFixed(0);
        acc[key]["clouds"] = (clouds.reduce((average, item) => { return average += item; }, 0) / (clouds.length)).toFixed(0);
        acc[key]["rain"] = (pop.reduce((average, item) => { return average += item; }, 0) / (pop.length * 0.01)).toFixed(0);
        acc[key]["windGust"] = ((gust.reduce((average, item) => { return average += item; }, 0) / gust.length) * 3.6).toFixed(0);
        acc[key]["pressure"] = ((pressure.reduce((average, item) => { return average += item; }, 0) / (pressure.length)) * 0.0009869233).toFixed(2);
        acc[key]["selected"] = false;
    }
    acc[Object.keys(acc)[0]].selected = true;

    return acc;
}

function findFrequentElement(array) {
    const modeMap = {};
    let maxEl = array[0];
    let maxCount = 1;

    // eslint-disable-next-line array-callback-return
    array.map((item, idx, arr) => {
        if (!modeMap[item])
            modeMap[item] = 1;
        else
            modeMap[item]++;

        if (modeMap[item] > maxCount) {
            maxEl = item;
            maxCount = modeMap[item];
        }
    });

    maxEl = maxEl[0].toUpperCase() + maxEl.substring(1);

    return maxEl;
}