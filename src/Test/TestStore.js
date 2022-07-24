import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { weatherAPISlice } from "../store/ComponentData/FetchData";
import { weatherSlice } from "../store/ComponentData/weatherData";


const setupStore = preloadedState => {
    return configureStore({
        reducer: {
            weatherData: weatherSlice.reducer,
            weatherAPIData: weatherAPISlice.reducer,
        },preloadedState
    })
}

let store1;

export default async function renderWithProviders(ui, {
    preloadedState = {}, store = setupStore(), ...renderOptions
} = {}) {

    store1 = store;
    return render(<Provider store={store}>{ui}</Provider>);
}

export {store1};