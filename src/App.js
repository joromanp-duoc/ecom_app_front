//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ProductoList from './pages/ProductoList.js';

function App() {
  return (
    <Router>
      <div>
        <h1>Product Management System</h1>
        <Routes>
          <Route path="/" element={<ProductoList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
