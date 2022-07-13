import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import ChartDataLabels from 'chartjs-plugin-datalabels'


function TempChart(props) {

    const oneDayWeather = useSelector((state) => state.weatherData.oneDayWeatherData);
    const labels = [], tempData = [];

    oneDayWeather[Object.keys(oneDayWeather)[0]].map((item) => {
        labels.push(new Date(item.dt_txt).toLocaleTimeString('en-US', { hour12: true, hour: 'numeric' }));
        tempData.push((item.main.temp - 273.15).toFixed(0));
    })

    const data = {
        labels: labels,
        datasets: [{
            label: 'Temperature Celcius',
            data: tempData,
            fill: true,
            pointRadius: 0,
            backgroundColor: 'rgba(255, 179, 0, 0.2)',
            borderColor: 'rgba(255, 179, 0)',
            tension: 0.2
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            intersect: false,
            axis: 'x'
        },
        plugins: {
            legend: {
                display: true,
            },

            datalabels: {
                display: true,
                color: "white",
                align: "end",
                padding: {
                    bottom: 15
                },
            },
        },
        scales: {
            yAxes:
            {
                display: false,
                min: (Math.min(...tempData) - 2.5),
                max: (Math.max(...tempData) + 2),
                grid: {
                    display: false
                }
            },
            xAxes:
            {
                grid: {
                    display: false
                },
                ticks: {
                    color: 'grey',
                    maxRotation:0,
                    autoSkip:true
                }
            },
        }
    };

    return (
        <Line data={data} plugins={[ChartDataLabels]}
            options={options} />
    )

}

export default TempChart;