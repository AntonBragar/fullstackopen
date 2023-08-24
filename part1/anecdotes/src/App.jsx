import {useState} from 'react'

const Header = ({text}) => <h2>{text}</h2>

const Anecdote = ({anecdote, votes}) => {
    return(
        <div>
            <p>{anecdote}</p>
            <p>{votes}</p>
        </div>
    )
}

const Button = ({onClick, text}) => {
    return(
        <button onClick={onClick}>
            {text}
        </button>
    )
}

const Winner = ({anecdotes, votes}) => {
    const highestVoteCount = Math.max(...votes)
    const winnerIndex = votes.indexOf(highestVoteCount)
    const winner = anecdotes[winnerIndex]

    if (highestVoteCount === 0) {
        return (
            <p>No votes yet</p>
        )
    }

    return (
        <div>
            <p>{winner}</p>
            <p>has {highestVoteCount} votes</p>
        </div>
    )
}

function App() {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]

    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

    const getRandomNumber = () => {
        const randomNum = Math.floor(Math.random() * anecdotes.length)
        setSelected(randomNum)
    }

    const handleVoteClick = () => {
        const newAllVotes = [...votes]
        newAllVotes[selected] += 1
        setVotes(newAllVotes)
    }

    return (
        <div>
            <Header text="Anecdote of the day"/>
            <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]}/>
            <Button onClick={getRandomNumber} text="next anecdote"/>
            <Button onClick={handleVoteClick} text="vote"/>
            <Header text="Anecdote with most votes" />
            <Winner anecdotes={anecdotes} votes={votes}/>
        </div>
    )
}

export default App
