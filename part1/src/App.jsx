 const Hello = () => {
  return(
    <div><p>Hello, world!</p></div>
  )
 }

const App = () => {
  console.log("Hello from component!");
  
  const now = Date();
  const a = 10;
  const b = 20;
  console.log(now, a + b);
  return (
    <div>
      <h1>Greetings!</h1>
      <Hello />
      <Hello />
      <Hello />
    </div>
  )
}

export default App
