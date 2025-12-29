import { useState } from 'react'

let ex_c = 0;
const App = () => {
  const [counter, setCounter] = useState(0)

  ex_c++;
  console.log("App body executed", ex_c, "-th time, counter:", counter);
  setTimeout(() => setCounter(counter + 1), 1000);

  // When the state modifying function setCounter is called,
  // React re-renders the component which means that the function body of the component function
  // gets re-executed

  return (
    <div>{counter}</div>
  )
}

export default App
