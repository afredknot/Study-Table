import React from 'react';
import { Link } from 'react-router-dom';
import NewsCard from '../NewsCard';
import './style.css';

function LandingPage() {
  return (
    <div className='landing-page'>
      <h1>Welcome!</h1>
      <div className='landingPageDisplay'>
        <NewsCard />
        <div className='buttons'>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/signup">
            <button>Signup</button>
          </Link>
          <img className="icon" src='studyIcon.ico' alt='book icon' />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;