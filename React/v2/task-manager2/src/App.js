import './App.css';
import CarListing from './myComponents/carListing.js';
import MyMenu from './myComponents/myMenu.js';
import AddCar from './myComponents/addCar.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MyMenu />} />
        <Route path="/carListing" element={<CarListing />} />
        <Route path="/addCar" element={<AddCar />} />
      </Routes>
    </Router>
  );
}

export default App;
