import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function LandingPage() {
  return (
    <div className='landing-page'>
      <h1>Welcome to Study-Table</h1>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/signup">
        <button>Signup</button>
      </Link>
    </div>
  );
}

export default LandingPage;