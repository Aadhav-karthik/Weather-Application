import { WeatherIcon, weatherIcon } from "../../External/WeatherIcons";
import '../../CSS/FiveDayWeatherSection.css';
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectWeatherDay } from "../../store/index";
import Tooltip from '@material-ui/core/Tooltip';


function FiveDayWeatherSection(props) {

    const fiveDayWeather = useSelector((state) => state.weatherData.fiveDayWeatherData);
    const city = useSelector((state) => state.weatherData.city)
    const dispatch = useDispatch();


    const DayRows = () => {

        const fiveDayWeatherData = fiveDayWeather;
        let dayRows = [];

        for (let key in fiveDayWeatherData) {

            const daySelected = {};
            if (fiveDayWeatherData[key].selected === true)
                daySelected.backgroundColor = 'rgba(79, 79, 79, 0.478)';


            dayRows.push(
                <div style={daySelected} data-testid={"fiveDayData"+key} className="row text-md-start text-end weather-days" key={key} onClick={() => { dispatch(selectWeatherDay(key)) }}>
                    <div className="col-3 col-md-2" data-testid="weatherDate">{new Date(key).toLocaleDateString("en-GB", { weekday: 'short', day: 'numeric' })}</div>

                    <div className="col-4 col-md-2">
                        <Tooltip title="Max and Min Temperatures" arrow>
                        <div>
                            <strong>{fiveDayWeatherData[key].maxTemp}&#176;</strong>
                            /{fiveDayWeatherData[key].minTemp}&#176;
                        </div>
                        </Tooltip>
                    </div>

                    <div className="col-md-1 d-none d-sm-block col-1"><WeatherIcon weather={fiveDayWeatherData[key].description} /></div>
                    <div className="col-md-3 col-4 description">
                        <Tooltip title="Weather Description" arrow><div data-testid="description">{fiveDayWeatherData[key].description}</div></Tooltip>
                    </div>

                    <div className="col-md-2 col-4 pt-3 pt-md-0">
                        <Tooltip title="Humidity" arrow><div data-testid="humidity">{weatherIcon.HUMIDITY}{fiveDayWeatherData[key].humidity}%</div></Tooltip>
                    </div>
                    <div className="col-md-2 col-6 pt-3 pt-md-0">
                        <Tooltip title="Wind Speed" arrow><div data-testid="windSpeed">{weatherIcon.WIND}{fiveDayWeatherData[key].windSpeed} km/h</div></Tooltip>
                    </div>
                </div>)
        }
        return dayRows;
    }

    return (
        <div className="col-md-6">
            <div className="card five-day-card">
                <div className="card-header five-day-header">
                    <h4 className="pt-2 d-inline-block">
                        5-Day Weather
                    </h4>
                    <Tooltip title="City" arrow ><p data-testid="city" className="city-header pt-2 d-inline-block">{city}</p></Tooltip>

                    <p className="pt-2 text-primary">As of {new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })} IST</p>
                </div>
                <div className="card-body">
                    <DayRows />
                </div>
            </div>
        </div>
    )
}

export default FiveDayWeatherSection;