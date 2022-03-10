import logo from './logo.svg';
import './App.css';
import {SearchView} from './search.js'

function App() {
  // Returns a functional component - I did it this way becuase it's more
  // like how large-scale web apps are built: not all in one file
  return <SearchView/>
}

export default App;
