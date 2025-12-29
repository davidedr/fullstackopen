import { useState } from 'react'

const Display = ({ counter }) => {
  return (<div>{counter}</div>)
}

const Button = ({ label, onClick }) => {
  return (<button onClick={onClick}>{label}</button>)
}

const App = () => {
  const [counter, setCounter] = useState(0)

  const resetCounter = () => {
    setCounter(0);
  }

  const increaseCounter = () => {
    setCounter(counter + 1);
  }

  const decreaseCounter = () => setCounter(counter - 1);

  return (
    <>
      <Display counter={counter} />
      <div>
        <Button label="+" onClick={increaseCounter} />
        <Button label="Reset" onClick={resetCounter} />
        <Button label="-" onClick={decreaseCounter} />
      </div>
    </>
  )
}

export default App
