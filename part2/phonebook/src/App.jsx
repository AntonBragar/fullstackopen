import {useState} from 'react'
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456', id: 1},
        {name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
        {name: 'Dan Abramov', number: '12-43-234345', id: 3},
        {name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
    ])
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    const handleNameChange = (e) => {
        setNewName(e.target.value)
    }

    const handleNumberChange = (e) => {
        setNewNumber(e.target.value)
    }

    const handleFilterChange = (e) => {
        setFilter(e.target.value)
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const newPerson = {
            name: newName,
            number: newNumber,
            id: persons.length + 1,
        }


        const duplicateName = persons.find((person) => person.name === newPerson.name)
        if (duplicateName) {
            alert(`${newName} is already added to phonebook`)
        } else if (!newPerson.number) {
            alert(`Type a number!`)
        } else {
            setPersons([...persons, newPerson])
            setNewName("")
            setNewNumber("")
        }
    }

    const personToShow = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} handleFilter={handleFilterChange}/>
            <PersonForm handleFormSubmit={handleFormSubmit} handleNameChange={handleNameChange} newName={newName}
                        newNumber={newNumber} handleNumberChange={handleNumberChange}/>
            <h2>Numbers</h2>
            <Persons personToShow={personToShow}/>
        </div>
    )
}

export default App