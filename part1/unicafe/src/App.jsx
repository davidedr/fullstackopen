import { useState } from 'react'
import { normalizeModuleId } from 'vite/module-runner';

const Button = ({ label, onClick }) => {
  return (
    <button onClick={onClick}>{label}</button>
  );
}

const StatisticLine = ({ label, value }) => {
  if (label === "positive")
    return(
      <tr>
        <td>{label}</td><td>{Math.round(value*10)/10}%</td>
      </tr>
      );
  else
    return(
      <tr>
        <td>{label}</td><td>{Math.round(value*10)/10}</td>
      </tr>
    );
}

const Statistics = ({ good, bad, neutral, all, average, positive }) => {
  if (all > 0)
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
        <StatisticLine label="good" value={good} />
        <StatisticLine label="neutral" value={neutral} />
        <StatisticLine label="bad" value={bad} />
        <StatisticLine label="all" value={all} />
        <StatisticLine label="average" value={average} />
        <StatisticLine label="positive" value={positive} />
      </tbody>
      </table>
    </div>
  )
  else
    return (
    <div>
      <h1>statistics</h1>
      <p>No feedback given</p>
    </div>)
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const update_stats = (good, bad, all) => {
    if (all > 0) {
      setAverage((good * 1 + bad * (-1)) / all);
      setPositive(good / all * 100);
    }
  }

  const handleGoodClick = () => {
    const new_good = good + 1;
    setGood(new_good);
    const new_all = new_good + neutral + bad
    setAll(new_all)
    update_stats(new_good, bad, new_all)
  }

  const handleNeutralClick = () => {
    const new_neutral = neutral + 1;
    setNeutral(new_neutral);
    const new_all = good + new_neutral + bad
    setAll(new_all)
    update_stats(good, bad, new_all)
  }

  const handleBadClick = () => {
    const new_bad = bad + 1;
    setBad(new_bad);
    const new_all = good + neutral + new_bad
    setAll(new_all)
    update_stats(good, new_bad, new_all)
  }

  return (
    <div>
      <h1>give feedbak</h1>
      <div>
        <Button label="good" onClick={ handleGoodClick } />
        <Button label="neutral" onClick={ handleNeutralClick } />
        <Button label="bad" onClick={ handleBadClick } />
      </div>
      <Statistics good={good} bad={bad} neutral={neutral} all={all} average={average} positive={positive} />
    </div>
  )
}

export default App