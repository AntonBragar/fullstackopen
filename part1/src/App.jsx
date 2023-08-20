import React from 'react';

const App = () => {
    const now = new Date();
    let a = 5;
    let b = 10;
    return (
        <div>
            Hello World, it is {now.toString()}
            <p>{a} + {b} = {a + b}</p>
        </div>
    );
};

export default App;