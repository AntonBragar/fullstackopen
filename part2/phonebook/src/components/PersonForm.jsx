import React from 'react';

const PersonForm = ({handleFormSubmit, handleNameChange, newName, newNumber, handleNumberChange}) => {
    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <h1>Add a new</h1>
                <div>
                    name: <input onChange={handleNameChange} value={newName} placeholder="Type name"/>
                </div>
                <div style={{paddingTop: 10}}>
                    number: <input onChange={handleNumberChange} value={newNumber} placeholder="Type name"/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    );
};

export default PersonForm;