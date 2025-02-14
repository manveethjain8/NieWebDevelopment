import AirlineEdit from './airlines/AirlineEdit';
import AirlineCreate from './airlines/AirlineCreate';
import AirlineView from './airlines/AirlineView';
import AirlineList from './airlines/AirlineList';
import 'primereact/resources/themes/lara-light-indigo/theme.css';  // Theme CSS (you can choose a different theme)
import 'primereact/resources/primereact.min.css';  // Core PrimeReact CSS
import 'primeicons/primeicons.css';  // Icons for PrimeReact components


import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<AirlineList />} />
            <Route path="/airlines/list" element={<AirlineList />} />
            <Route path="/airlines/create" element={<AirlineCreate />} />
            <Route path="/airlines/view/:id" element={<AirlineView />} />
            <Route path="/airlines/edit/:id" element={<AirlineEdit />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
