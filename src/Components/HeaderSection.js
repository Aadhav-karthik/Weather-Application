import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSelectedCity } from '../store/index';

import '../CSS/HeaderSection.css';


function HeaderSection(props) {
    return (
        <header className="bg-dark">
            <div className="container row py-2">
                <h3 className="col-md-5 col-4 text-light">ReactWeather</h3>
                <CityDropdown />
                <div className="col-md-2"></div>
            </div>
        </header>
    )
}

function CityDropdown(props) {
    const cities = useSelector((state => state.weatherData.cities));
    const dispatch = useDispatch();
    const [city, setCity] = useState('');
    const [dropdown, setDropdown] = useState(false);
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target))
            setDropdown(false);
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
        
    })

    const citySearch = (value) => {
        setCity(value);
        setDropdown(true);
    }

    const updateSelected = (item) => {
        dispatch(changeSelectedCity(item.id));
        setDropdown(false);
        setCity(item.name);
    }

    const CityList = () => {
        const cityList = [];

        cities.map(item => {
            if (item.name.toLowerCase().startsWith(city.toLowerCase())) {
                cityList.push(<li key={item.id} onClick={(e) => { updateSelected(item) }} className="dropdown-item">{item.name}</li>)
            }
        })

        return cityList;
    }

    return (
        <div id="citySearch" ref={ref} className="col-md-3 col-12 position-relative">
            <div id="citySearch-1" className="mt-md-0 mt-3 position-absolute">
                <form>
                    <input id="searchBar" type="text" className="form-control" value={city} onClick={() => setDropdown(!dropdown)}
                        onChange={(e) => citySearch(e.target.value)} placeholder="Search city" />
                </form>
                <ul id="dropdownList" className="dropdown mt-1">
                    {dropdown && <CityList />}
                </ul>
            </div>
        </div>
    )
}



export default HeaderSection;