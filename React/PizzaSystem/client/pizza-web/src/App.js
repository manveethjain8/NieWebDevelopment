import PizzaEdit from './pizzas/PizzaEdit';
import PizzaCreate from './pizzas/PizzaCreate'
import PizzaView from './pizzas/PizzaView'
import PizzaList from './pizzas/PizzaList'

import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<PizzaList />} />
            <Route path="/pizzas/list" element={<PizzaList />} />
            <Route path="/pizzas/create" element={<PizzaCreate />} />
            <Route path="/pizzas/view/:id" element={<PizzaView />} />
            <Route path="/pizzas/edit/:id" element={<PizzaEdit />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;