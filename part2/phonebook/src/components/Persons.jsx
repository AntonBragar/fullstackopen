import React from 'react';

const Persons = ({personToShow}) => {
    return (
        <div>
            {personToShow.map((person) => (
                <p key={person.id}><strong>{person.name}</strong> - <strong>{person.number}</strong></p>
            ))}
        </div>
    );
};

export default Persons;