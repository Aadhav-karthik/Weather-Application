import { useSelector } from "react-redux";
import "../../CSS/WindChart.css";
import { weatherIcon } from "../WeatherIcons";
import newsIcon from "../news-compass3.png";
import React from 'react';

function WindChart(props) {

    const oneDayWeather = useSelector((state) => state.weatherData.oneDayWeatherData);
    const fiveDayWeather = useSelector((state) => state.weatherData.fiveDayWeatherData);
    const labels = [], windDir = [], windSpeed = [];

    oneDayWeather[Object.keys(oneDayWeather)[0]].map((item, idx) => {

        labels.push(
            <div key={idx} className="col-time">{new Date(item.dt_txt).toLocaleTimeString('en-US', { hour12: true, hour: 'numeric' })}
            </div>
        );

        windDir.push(
            <div className="col-dir" key={idx} style={{ transform: "rotate(" + (item.wind.deg - 90).toFixed(0) + "deg)" }}>
                {weatherIcon.WINDDIRECTION}
            </div>
        );

        windSpeed.push(<div className="col-speed" key={idx}>{(item.wind.speed * 3.6).toFixed(0) + " km/h"}</div>)
    })


    return (
        <div className="wind-chart">
            <div className="position-relative">
                <img className="position-absolute d-none d-md-block news-icon" src={newsIcon} alt="NEWS" />
            </div>

            <div className="d-flex text-white justify-content-between">
                {windSpeed}
            </div>
            <div className="d-flex wind-direction justify-content-between">
                {windDir}
            </div>
            <div className="d-flex justify-content-between">
                {labels}
            </div>
            <div className="text-white row mt-4 mx-2 px-md-5 mx-md-5 ">
                <div className="d-flex justify-content-between ">
                    <div>
                        <div className="float-start pe-2">{weatherIcon.WIND}</div>
                        <div className="float-end specific-header"><small>Wind Gust</small>
                            <br /><strong>{fiveDayWeather[Object.keys(oneDayWeather)[0]].windGust} km/h</strong>
                        </div>
                    </div>
                    <div>
                        <div className="float-start pe-2">{weatherIcon.PRESSURE}</div>
                        <div className="float-end specific-header"><small>Pressure</small>
                            <br /><strong>{fiveDayWeather[Object.keys(oneDayWeather)[0]].pressure} atm</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WindChart;