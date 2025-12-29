import ReactDOM from 'react-dom/client'
import App from './App.jsx'

let counter = 1;

const root = ReactDOM.createRoot(document.getElementById('root'));
const refresh = () => {
  root.render(<App counter={counter}/>);
}

// initial painting
refresh();

setInterval(() => {
  counter++;
  refresh();
}, 2000)