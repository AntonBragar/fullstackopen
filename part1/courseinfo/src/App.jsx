import Header from "./Header.jsx";
import Content from "./Content.jsx";
import Total from "./Total.jsx";

const App = () => {
    const courses = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            },
        ]
    }

    return (
        <div>
            <Header course={courses.name}/>
            <Content parts={courses.parts}/>
            <Total count={courses.parts.length}/>
        </div>
    )
}

export default App