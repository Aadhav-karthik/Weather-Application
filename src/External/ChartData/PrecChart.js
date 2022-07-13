import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { useDispatch, useSelector } from "react-redux";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import React from 'react';

function PrecChart(props) {

    const oneDayWeather = useSelector((state) => state.weatherData.oneDayWeatherData);
    const labels = [], precProb = [];

    oneDayWeather[Object.keys(oneDayWeather)[0]].map((item) => {
        precProb.push((item.pop * 100).toFixed(0));
        labels.push(new Date(item.dt_txt).toLocaleTimeString('en-US', { hour12: true, hour: 'numeric' }));
    })

    const data = {
        labels: labels,
        datasets: [{
            label: 'Precipitation %',
            data: precProb,
            fill: true,
            pointRadius: 0,
            backgroundColor: 'rgba(0, 174, 255, 0.2)',
            borderColor: 'rgb(0, 174, 255)',
            tension: 0.3,
            //stepped: true
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
                min: 0,
                max: 100,
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

export default PrecChart;