import React, {useEffect, useState} from 'react'
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";
import axios from "axios";
import personService from './services/persons.js'
import Notification from "./components/Notification.jsx";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        personService
            .getAll()
            .then(persons => setPersons(persons))
    }, []);

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
        }

        const duplicatePerson = persons.find((person) => person.name === newPerson.name)

        if (duplicatePerson) {
            if (window.confirm(`Are you sure you want to update phone number to ${duplicatePerson.name}?`)) {
                personService.update(duplicatePerson.id, newPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map((person) => person.id !== returnedPerson.id ? person : returnedPerson))
                        setNewName("")
                        setNewNumber("")
                        setNotification({
                            text: `${duplicatePerson.name}'s number was updated.`,
                            type: 'notification'
                        })
                        setTimeout(() => setNotification(null), 5000)
                    })
                    .catch(error => {
                        setPersons(persons
                            .filter(person =>
                                person.name !== duplicatePerson.name
                            )
                        )
                        setNotification({
                            text: `${duplicatePerson.name} has already been deleted from the server.`,
                            type: 'error'
                        })
                        setTimeout(() => {
                            setNotification(null)
                        }, 5000)
                    })
            }
        } else if (!newPerson.number) {
            setNotification({
                text: `Phone number is important.`,
                type: 'error'
            })
            setTimeout(() => setNotification(null), 5000)
        } else {
            personService.create(newPerson)
                .then(person => {
                    setPersons(persons.concat(person))
                    setNewName("")
                    setNewNumber("")
                    setNotification({
                        text: `${person.name} has been added to the contacts`,
                        type: 'notification'
                    })
                    setTimeout(() => setNotification(null), 5000)
                })
        }
    }
    const deletePerson = (id) => {
        let personToDelete = persons.find(person => person.id === id)
        if (window.confirm(`Are you sure you want to delete ${personToDelete.name}?`)) {
            personService.deleteContact(id)
            setPersons(persons.filter(person => person.id !== id))
        }
        setNotification({
            text: `${personToDelete.name} has been deleted.`,
            type: 'notification'
        })
        setTimeout(() => setNotification(null), 5000)
    }

    const personToShow = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification notification={notification}/>
            <Filter filter={filter} handleFilter={handleFilterChange}/>
            <PersonForm handleFormSubmit={handleFormSubmit} handleNameChange={handleNameChange} newName={newName}
                        newNumber={newNumber} handleNumberChange={handleNumberChange}/>
            <h2>Numbers</h2>
            <Persons personToShow={personToShow} deleteContact={deletePerson}/>
        </div>
    )
}

export default App