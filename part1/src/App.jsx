const Footer = () => {
  return(
    <div>
      <p>Greeting app</p>
    </div>
  )
}
const Hello = (props) => {
  console.log(props);
  return(
    <div><p>Hello, {props.name}, you are {props.age} years old!</p></div>
  )
 }

const App = () => {
  console.log("Hello from component!");
  
  const now = Date();
  const a = 10;
  const b = 20;
  console.log(now, a + b);

  const name = "Peter"
  const age = 18

  const friends = [{ name: 'Peter', age: 4 },
    { name: 'Maya', age: 10 },
  ]

  return (
    <>
      <h1>Greetings!</h1>
      <Hello name="John" age={26+10}/>
      <Hello name="Jane" age={age}/>
      <Hello name={name} age={age}/>

      <Hello name={friends[0].name} age={friends[0].age}/>
      <Hello name={friends[1].name} age={friends[1].age}/>
      <Footer />
    </>
  )
}

export default App
