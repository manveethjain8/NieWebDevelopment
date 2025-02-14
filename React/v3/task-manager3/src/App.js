import './App.css';
import Task from './Components/task.js';
import AddBook from './Components/addBook.js';
import Navbar from './Components/navBar.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path ="/" element ={<Navbar/>}/>
        <Route path ="/task" element ={<Task/>}/>
        <Route path ="/addBook" element ={<AddBook/>}/>
      </Routes>
    </Router>
  );
}

export default App;