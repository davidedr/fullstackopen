import { useState } from 'react'

function App() {
  const [clicks, setClicks] = useState({ left: 0, right: 0});
  const [allClicks, setAllClicks] = useState([]);
  const [totalClicks, setTotalClicks] = useState(0);

  const handleLeftClicks = () => {
    setClicks({...clicks, left: clicks.left + 1});
    setAllClicks([...allClicks, 'L']);    
    // Equivalent: setAllClicks(allClicks.concat('L')) concate returns a new copy 
    // Don't do: setAllClicks(allClicks.push('L')); push updates array
    setTotalClicks(clicks.left + clicks.right);
  }

  const handleRightClicks = () => {
    setClicks({...clicks, right: clicks.right + 1});
    setAllClicks([...allClicks, 'R']);
    setTotalClicks(clicks.left + clicks.right);
  }

  // It is forbidden in React to mutate state directly,
  // since it can result in unexpected side effects.
  // Changing state has to always be done by setting the state to a new object.
  // If properties from the previous state object are not changed,
  // they need to simply be copied, which is done by copying those properties into a new object
  // and setting that as the new state.
  return (
    <>
      <div>{clicks.left}, {clicks.right}</div>
      <div>All: {allClicks.join()}</div>
      <div>Total clicks:{totalClicks}</div>
      <div>
        <button onClick={handleLeftClicks}>Left</button>
        <button onClick={handleRightClicks}>Right</button>
      </div>
    </>
  )
}

export default App
