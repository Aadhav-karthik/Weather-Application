/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-node-access */
import { fireEvent, screen, waitFor } from '@testing-library/react';
import App from '../App';
import HeaderSection from '../Components/HeaderSection';
import renderWithProviders, { setupStore, store1, stores } from './TestStore';
import * as fetchData from '../store/ComponentData/FetchData';
import { weatherData } from './MockAPI.js';
import WeatherSection from '../Components/WeatherSection';
import { act } from 'react-dom/test-utils';
import { useSelector } from 'react-redux';
import { coordinates } from '../External/CityCoordinates';

beforeEach(() => {
    global.fetch = () =>
        Promise.resolve({
            json: () => Promise.resolve(JSON.parse(weatherData)),
        })

})

afterEach(() => {
    jest.resetAllMocks();
})


it("Verify renders 1 day data displayed", async () => {

    await act(async () => {
        renderWithProviders(<App />);
    })

    fireEvent(screen.getByTestId("fiveDayData25/7/2022"), new MouseEvent('click', { bubbles: false }));
    expect(screen.getByTestId("temperature").textContent).toContain('34');
    expect(screen.getByTestId("wind").textContent).toContain('16');
    expect(screen.getByTestId("humidityOneDay").textContent).toContain('65');
    expect(screen.getByTestId("clouds").textContent).toContain('99');
    expect(screen.getByTestId("visibility").textContent).toContain('10');
    expect(screen.getByTestId("rain").textContent).toContain('32');
});


it("Verify renders 5 day data displays", async () => {

    await act(async () => {
        await renderWithProviders(<App />);
    });

    fireEvent.change(screen.getByTestId('searchBar'), { target: { value: 'C' } });
    fireEvent(screen.getByTestId('dropdownList'), new MouseEvent('click', { bubbles: false }));

    expect(screen.getByTestId("city").textContent).toBe("Chennai");
    expect(screen.getAllByTestId("humidity")[1].textContent).toBe('65%');
    expect(screen.getAllByTestId("windSpeed")[2].textContent).toBe('8 km/h');
    expect(screen.getAllByTestId("description")[0].textContent).toBe('Light rain');
}
)


it("Verify API call URL", async () => {

    jest.resetAllMocks();
    jest.spyOn(global, 'fetch');

    await act(async () => {
        renderWithProviders(<App />);
    })


    await waitFor(async () => expect(global.fetch).toHaveBeenCalledTimes(1));
    expect(global.fetch).toHaveBeenLastCalledWith("https://api.openweathermap.org/data/2.5/forecast?lat=13.0827&lon=80.2707&appid=" + process.env.REACT_APP_API_KEY);

})

it("Verify API call Return data based on city", async () => {
    let cities = [...coordinates];
    cities[0] = { ...cities[0] };
    cities[0].selected = false;
    cities[2] = { ...cities[2] };
    cities[2].selected = true;

    jest.resetAllMocks();
    jest.spyOn(fetchData, 'fetchWeatherData');
    jest.spyOn(global, 'fetch');

    await act(async () => {
        renderWithProviders(<App />);
    })

    expect(cities[2].selected).toBe(true);
    await store1.dispatch(fetchData.fetchWeatherData(cities));
    expect(global.fetch).toHaveBeenLastCalledWith("https://api.openweathermap.org/data/2.5/forecast?lat=22.5726&lon=88.3639&appid=" + process.env.REACT_APP_API_KEY);
})