const Hello = ({name, age}) => {
  
  /*
  const bornYear = () => {
    const yearNow = new Date().getFullYear();
    return yearNow - props.age;
  }
  */
 const bornYear = () =>  new Date().getFullYear() - age;

  return(
    <div>
      <p>Hello {name}, you're {age} years old</p>
      <p>So, you're born in {bornYear()}.</p>
    </div>
  );
}
const App = ({counter}) => {
  const name = "Peter"
  const age = 18
  return (
      <div>
        <p>Counter:{counter}</p>
        <h1>Greetings</h1>
        <Hello name="Maya" age={26+10} />
        <Hello name={name} age={age} />
      </div>
  )
}

export default App
