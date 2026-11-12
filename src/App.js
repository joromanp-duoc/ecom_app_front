//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import ProductoList from './pages/ProductoList.js';
import Login from './pages/Login.js';
import StoreNavBar from './components/NavBar.js';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <StoreNavBar />
          <Routes>
            <Route path="/" element={<ProductoList />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
