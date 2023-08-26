import React from 'react';
import Header from "./Header.jsx";
import CourseParts from "./CourseParts.jsx";

const Course = ({course}) => {
    return (
        <div>
            <Header name={course.name}/>
            <CourseParts parts={course.parts} />
        </div>
    );
};

export default Course;