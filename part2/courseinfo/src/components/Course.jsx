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

export default Course;