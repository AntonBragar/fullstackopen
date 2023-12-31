import React, {useEffect, useState} from 'react';
import axios from "axios";

const Weather = ({capital}) => {
    const api_key = import.meta.env.VITE_API_KEY

    const [weather, setWeather] = useState(null);

    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
            .then((response) => setWeather(response.data.current))
    })

    return (
        <div>
            <h2>Weather in {capital}</h2>
            <p>
                <strong>temperature:</strong> {weather?.temperature} Celcius
            </p>
            <img src={weather?.weather_icons} alt="weather icon" />
            <p>
                <strong>wind:</strong> {weather?.wind_speed} km/h direction{" "}
                {weather?.wind_dir}
            </p>
        </div>
    );
};

export default Weather;