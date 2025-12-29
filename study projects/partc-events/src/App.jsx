import { useState } from 'react'

// Longer versions
/*
const Display = ({ counter }) => {
  return (<div>{counter}</div>)
}

const Button = ({ label, onClick }) => {
  return (<button onClick={onClick}>{label}</button>)
}
*/
const Display = ({ counter }) => <div>{counter}</div>
const Button = ({ label, onClick }) => <button onClick={onClick}>{label}</button>

// When one of the buttons is clicked, the event handler is executed.
// The event handler changes the state of the App component with the setCounter function.
// Calling a function that changes the state causes the component to re-render.

// So, if a user clicks the plus button, the button's event handler changes
// the value of counter to 1, and the App component is re-rendered.
// This causes its subcomponents Display and Button to also be re-rendered.
// Display receives the new value of the counter, 1, as props.
// The Button components receive event handlers
// which can be used to change the state of the counter.
const App = () => {
  const [counter, setCounter] = useState(0)

  console.log("(rendering) App body, counter:", counter);

  const resetCounter = () => {
    console.log("resetCounter, BEFORE status update, counter:", counter);
    setCounter(0);
    console.log("resetCounter, AFTER status update, counter:", counter);
  }

  const increaseCounter = () => {
    console.log("increaseCounter, BEFORE status update, counter:", counter);
    setCounter(counter + 1);
    console.log("increaseCounter, AFTER status update, counter:", counter);
  }

  const decreaseCounter = () => {
    console.log("decreaseCounter, BEFORE status update, counter:", counter);
    setCounter(counter - 1);
    console.log("decreaseCounter, AFTER status update, counter:", counter);
  }

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
