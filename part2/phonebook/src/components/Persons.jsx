import React from 'react';

const Persons = ({ personToShow, deleteContact }) => {
    return (
        <div>
            {personToShow.map((person) => (
                <div key={person.id} style={{ display: 'flex', alignItems: 'center' }}>
                    <p style={{marginRight: 5}}><strong>{person.name}</strong> - <strong>{person.number}</strong></p>
                    <button onClick={() => deleteContact(person.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default Persons;
