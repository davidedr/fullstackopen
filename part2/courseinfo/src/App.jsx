const Course = ({ course }) => {

  const sumExerceises = (parts) => {
    let sumExercises = 0;
    parts.map(part => sumExercises += part.exercises)
    return sumExercises
  }

  const sumExerceisesReduce = (parts) => {
    let acc = 0;
    const sumExercises = parts.reduce((acc, part) => {
      console.log(1, part.id, part.exercises, acc)
      return acc + part.exercises;
    }, 0);
    return sumExercises
  }

  return(
    <>
    <h1>{course.name}</h1>
    <ul>
      {course.parts.map(part => <li key={part.id}>{part.name} {part.exercises}</li>)}
    </ul>
    {/* <b>total of {sumExerceisesReduce(course.parts)} excercises</b> <br /> */}
    <b>total of {course.parts.reduce((accumulator, part) => accumulator + part.exercises, 0)} excercises</b>
    </>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  
  return courses.map(course => <Course key={course.id} course={course} />)
}

export default App