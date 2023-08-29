import React, {useState} from 'react';
import CountryInfo from "./CountryInfo.jsx";

const Country = ({ country }) => {
    const [ state, setState ] = useState(false)

    const handleClick = () => {
        setState(!state)
    }

    return (
        <li>
            {country.name.common} <button onClick={handleClick}>{state ? 'hide' : 'show'}</button>
            {state && <CountryInfo country={country} />}
        </li>
    )
}

export default Country;