import React from 'react';
import { Link } from 'react-router-dom';
import NewsCard from '../NewsCard';
import './style.css';
import Auth from '../../utils/auth';

function LandingPage() {
  return (
    <div className='landing-page'>
      <h1>Welcome!</h1>
      <div className='landingPageDisplay'>
        <NewsCard />
        {!Auth.loggedIn() ? 
        (<div className='buttons'>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/signup">
            <button>Signup</button>
          </Link>
          <img className="icon" src='studyIcon.ico' alt='book icon' />
        </div>)
        : (null)}
      </div>
    </div>

  );
}

export default LandingPage;