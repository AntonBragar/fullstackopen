import React from 'react';
import Language from "./Language.jsx";
import Weather from "./Weather.jsx";

const CountryInfo = ({country}) => {
    const languageKeys = Object.keys(country.languages);

    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>
                <h3>Capital: {country.capital}</h3>
                <h3>area: {country.area}</h3>
            </div>
            <div>
                <h2>Languages</h2>
                <ul>
                    {languageKeys.map(languageKey => (
                        <Language key={languageKey} language={country.languages[languageKey]} />
                    ))}
                </ul>
            </div>
            <div>
                <img src={country.flags.png} alt={country.flags.alt}/>
            </div>
            <Weather capital={country.capital}/>
        </div>

    );
};

export default CountryInfo;