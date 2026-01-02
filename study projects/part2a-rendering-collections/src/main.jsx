import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'


/*
const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true
  }
]

import axios from 'axios'
*/

/*
const promise = axios.get('http://localhost:3001/notes')
                  .then(res => console.log(res));
console.log(promise)

const promise2 = axios.get('http://localhost:3001/foobar')
console.log(promise2)
*/

/*
axios.get('http://localhost:3001/notes')
  .then(res => {
    const notes = res.data;
    ReactDOM.createRoot(document.getElementById('root')).render(
      <App notes={notes} />
    )
  })
*/

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />)
