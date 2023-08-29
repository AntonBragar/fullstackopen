import {useState, useEffect} from "react";
import countryServices from "./servises/countries.js"
import Filter from "./components/Filter.jsx";
import Countries from "./components/Countries.jsx";


function App() {
    const [countries, setCountries] = useState([]);
    const [inputValue, setInputValue] = useState("")

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    useEffect(() => {
        countryServices.getAllCountries().then(data => setCountries(data))
    }, [])

    return (
        <>
            <div>
                <Filter inputValue={inputValue} handleInputChange={handleInputChange} />
                <Countries countries={countries} inputValue={inputValue}/>
            </div>

        </>
    )
}

export default App
