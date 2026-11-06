//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ProductoList from './pages/ProductoList.js';
import StoreNavBar from './components/NavBar.js';

function App() {

  return (
    <Router>
      <div>
        <StoreNavBar />
        <Routes>
          <Route path="/" element={<ProductoList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
