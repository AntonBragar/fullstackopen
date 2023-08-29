import React from 'react';

const Filter = ({inputValue, handleInputChange}) => {
    return (
        <div>
            find countries: <input onChange={handleInputChange} value={inputValue} />
        </div>
    );
};

export default Filter;