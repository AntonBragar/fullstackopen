import React from 'react';
import CountryInfo from "./CountryInfo.jsx";
import Country from "./Country.jsx";

const Countries = ({countries, inputValue}) => {
    let filtered = []

    if (inputValue.length > 0) {
        filtered = countries.filter(country => country.name.common.toLowerCase().includes(inputValue.toLowerCase()))
    } else if (!inputValue) {
        filtered = []
    } else {
        filtered = countries
    }

    if (filtered.length > 10) {
        return 'Too many matches, specify another filter'
    } else if (filtered.length === 1) {
        return (
            <div>
                <CountryInfo country={filtered[0]}/>
            </div>
        )
    } else {
        return (
            <div>
                <div>
                    {filtered.map(country =>
                        <Country
                            key={country.name.common}
                            country={country}
                        />
                    )}
                </div>
            </div>
        )
    }
};

export default Countries;