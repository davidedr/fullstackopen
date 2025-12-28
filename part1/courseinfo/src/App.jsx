const Part = (props) => {
  return(
    <p>
      {props.part} {props.exercises}
    </p>
  );
}

const Header = (props) => {
  return(<h1>{props.course}</h1>);
}

const Content = (props) => {
  return(
    <>
    <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
    <Part part={props.parts[0].name} exercises={props.parts[1].exercises} />
    <Part part={props.parts[0].name} exercises={props.parts[2].exercises} />
    </>      
  );
}

const Total = (props) => {
  let tot_ex = 0;
  props.parts.forEach(ele => tot_ex += ele.exercises)  
  return(<p>Number of exercises {tot_ex}</p>);
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App