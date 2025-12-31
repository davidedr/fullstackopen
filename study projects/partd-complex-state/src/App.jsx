import { all } from 'axios';
import { useState } from 'react'

const History = ({ allClicks }) => {
  console.log(allClicks.length, allClicks);
  if (allClicks.length === 0) {
    return (
      <div>Press the buttons!</div>
    )
  }
  else 
    return(
    <div>
      Button presses history: {allClicks.join('')}
    </div>
    );
}

const Button = ({ label, handleClicks}) => {
  return (
    <button onClick={handleClicks}>{label} </button>
  ) 
}

function App() {
  const [clicks, setClicks] = useState({ left: 0, right: 0});
  const [allClicks, setAllClicks] = useState([]);
  const [totalClicks, setTotalClicks] = useState(0);

  // The total number of button presses is consistently one less than the actual amount of presses,
  // for some reason.

  // Even though a new value was set for left by calling setLeft(left + 1),
  // the ***old value persists despite the update***.
  // As a result, the attempt to count button presses produces a result that is too small

  // The reason for this is that a state update in React happens asynchronously,
  // i.e. not immediately but "at some point" after the current component function is finished,
  // before the component is rendered again.

  const handleLeftClicks = () => {
    const updatedLeftClicks = clicks.left + 1;
    setClicks({...clicks, left: updatedLeftClicks});
    setTotalClicks(updatedLeftClicks + clicks.right);

    setAllClicks([...allClicks, 'L']); 
    // Equivalent: setAllClicks(allClicks.concat('L')) concate returns a new copy 
    // Don't do: setAllClicks(allClicks.push('L')); push updates array
   }

  const handleRightClicks = () => {
    const updatedRightClicks = clicks.right + 1;
    setClicks({...clicks, right: updatedRightClicks});
    setTotalClicks(clicks.left + updatedRightClicks);

    setAllClicks([...allClicks, 'R']);
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
      <History allClicks={allClicks} />
      <div>Total clicks:{totalClicks}</div>
      <div>
        <Button label={"Left"} handleClicks={handleLeftClicks} />
        <Button label={"Right"} handleClicks={handleRightClicks} />
      </div>
    </>
  )
}

export default App
