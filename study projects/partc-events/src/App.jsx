import { useState } from 'react'

const App = () => {
  const [counter, setCounter] = useState(0)

  const resetCounter = () => {
    setCounter(0);
  }

  const increaseCounter = () => {
    setCounter(counter + 1);
  }

  return (
    <>
      <div>{counter}</div>
      <div>
        <button onClick={increaseCounter}>+</button>
        <button onClick={resetCounter}>Reset</button>
      </div>
    </>
  )
}

export default App
