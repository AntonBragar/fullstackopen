import React from 'react';
import CoursePart from "./CoursePart.jsx";
import Total from "./Total.jsx";

const CourseParts = ({parts}) => {

    const totalExercises = parts.reduce((total, part) => total + part.exercises, 0)
    return (
        <div>
            {parts.map((part) => (
                <CoursePart key={part.id} part={part}/>
            ))}
            <Total total={totalExercises}/>
        </div>
    );
};

export default CourseParts;