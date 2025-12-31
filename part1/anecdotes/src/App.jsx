import { useState } from 'react'

const DisplayMaxVoted = ({ anecdotes, votes }) => {

  const getIndexOfMax = () => {
    const max = Math.max(...votes);
    if (max > 0)
      return { max: max, maxIndex: votes.indexOf(max) }
    return { max: 0, maxIndex: votes[0] }
  }

  const { max, maxIndex } = getIndexOfMax();
  if (max > 0)
    return (
      <>
        <h1>Andocte with most votes</h1>
        {anecdotes[maxIndex]} <br />
        has {votes[maxIndex]} votes
      </>
    )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const handleVoteClick = () => {
    const new_votes = [...votes];
    new_votes[selected]++
    setVotes(new_votes);
  }

  return (
    <>
      <h1>Andocte of the day</h1>
      <div>
        {anecdotes[selected]} <br />
        has {votes[selected]} votes
      </div>
      <div>
        <button onClick={handleVoteClick}>Vote</button>
        <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>next anedocte</button>
      </div>
      <DisplayMaxVoted anecdotes={anecdotes} votes={votes} />
    </>
  )
}

export default App