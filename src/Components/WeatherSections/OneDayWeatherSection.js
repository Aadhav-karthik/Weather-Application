import React, { useState } from "react";
import { useSelector } from "react-redux";
import '../../CSS/OneDayWeatherSection.css';
import { weatherIcon } from "../../External/WeatherIcons";
import TempChart from "../../External/ChartData/TempChart";
import WindChart from "../../External/ChartData/WindChart";
import PrecChart from "../../External/ChartData/PrecChart";


function OneDayWeatherSection(props) {

    const oneDayWeather = useSelector((state) => state.weatherData.oneDayWeatherData);
    const fiveDayWeather = useSelector((state) => state.weatherData.fiveDayWeatherData);
    const [chart, setChart] = useState('temp');
    const temp = {}, prec = {}, wind = {};

    const chartElement = () => {
        switch (chart) {
            case 'temp':
                temp.borderBottom = "0.15rem solid rgb(255, 238, 0)"
                return <TempChart />;

            case 'prec':
                prec.borderBottom = "0.15rem solid rgb(0, 174, 255)"
                return <PrecChart />

            case 'wind':
                wind.borderBottom = "0.15rem solid rgb(187, 255, 243)"
                return <WindChart />

            default:
                return null;
        }
    }

    return (
        <div className="col-md-6">
            <div className="card one-day-data bg-dark mt-3 mt-md-0 mb-4 mb-md-0">
                <div className="card-header">
                    <h5 className="card-title text-light p-1">Weather on {
                        new Date(Object.keys(oneDayWeather)).toLocaleDateString("en", { weekday: 'long', day: 'numeric', month: 'short' })
                    }</h5>
                </div>
                <div className="card-body">
                    <div className="row ">
                        <div className="col-12 col-md-6  d-flex">
                            <button style={temp} onClick={() => setChart('temp')} className="px-0 mx-1 btn chart-nav-btn">Temperature</button>
                            <button style={prec} onClick={() => setChart('prec')} className="px-0 mx-3 btn chart-nav-btn">Precipitation</button>
                            <button style={wind} onClick={() => setChart('wind')} className="px-0 mx-1 btn chart-nav-btn">Wind</button>
                        </div>
                        <div className="col-12 mt-3 mt-md-0 chart-data">
                            {Object.keys(oneDayWeather).length !== 0 ? chartElement() : null}
                        </div>
                    </div>
                    <div className="card one-day-bottom-card bg-dark text-light my-4 py-4">
                        <div className="card-body px-md-5">
                            <div className="d-flex justify-content-between me-md-4">
                                <div>
                                    <div className="float-start px-md-2 pe-2 temperature">{weatherIcon.TEMPERATURE}</div>
                                    <div className="float-end specific-header"><small>Feels Like</small>
                                        <br /><strong>{fiveDayWeather[Object.keys(oneDayWeather)[0]].tempFeel}&#176; C</strong>
                                    </div>
                                </div>
                                <div>
                                    <div className="float-start pe-2 wind-speed">{weatherIcon.WIND}</div>
                                    <div className="float-end specific-header"><small>Wind</small>
                                        <br /><strong>{fiveDayWeather[Object.keys(oneDayWeather)[0]].windSpeed} km/h</strong>
                                    </div>
                                </div>
                                <div>
                                    <div className="float-start pe-2 humidity-one">{weatherIcon.HUMIDITY}</div>
                                    <div className="float-end specific-header"><small>Humidity</small>
                                        <br /><strong>{fiveDayWeather[Object.keys(oneDayWeather)[0]].humidity}%</strong>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex pt-5 justify-content-between me-md-5">
                                <div>
                                    <div className="cloud float-start pe-2 cloud">{weatherIcon.CLOUD}</div>
                                    <div className="float-end specific-header"><small>Cloud Cover</small>
                                        <br /><strong>{fiveDayWeather[Object.keys(oneDayWeather)[0]].clouds}%</strong>
                                    </div>
                                </div>
                                <div>
                                    <div className="float-start pe-2 visibility">{weatherIcon.VISIBILITY}</div>
                                    <div className="float-end me-md-5 specific-header"><small>Visibility</small>
                                        <br /><strong>{fiveDayWeather[Object.keys(oneDayWeather)[0]].visibility} km</strong>
                                    </div>
                                </div>
                                <div>
                                    <div className="float-start pe-2 rain-pop">{weatherIcon.RAIN}</div>
                                    <div className="float-end me-md-1 specific-header"><small>Rain</small>
                                        <br /><strong>{fiveDayWeather[Object.keys(oneDayWeather)[0]].rain}%</strong>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}

export default OneDayWeatherSection;