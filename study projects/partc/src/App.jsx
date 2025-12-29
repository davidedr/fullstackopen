const Hello = (props) => {
  
  /*
  const bornYear = () => {
    const yearNow = new Date().getFullYear();
    return yearNow - props.age;
  }
  */
 const bornYear = () =>  new Date().getFullYear() - props.age;
 
  return(
    <div>
      <p>Hello {props.name}, you're {props.age} years old</p>
      <p>So, you're born in {bornYear()}.</p>
    </div>
  );
}
const App = () => {
  const name = "Peter"
  const age = 18
  return (
      <div>
        <h1>Greetings</h1>
        <Hello name="Maya" age={26+10} />
        <Hello name={name} age={age} />
      </div>
  )
}

export default App
