import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header style={{ backgroundColor: '#282c34', padding: '10px' }}>
    <nav>
        <h1>Observatorio de Violencia Hacia las Personas LGBTI+ de Honduras KAI+</h1>
      <Link to="/" style={{ margin: '10px', color: '#61dafb' }}>Home</Link>
      <Link to="/register" style={{ margin: '10px', color: '#61dafb' }}>Register</Link>
      <Link to="/login" style={{ margin: '10px', color: '#61dafb' }}>Login</Link>
    </nav>
  </header>
);

export default Header;
