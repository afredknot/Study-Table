import React from 'react';
import { Link } from 'react-router-dom';
import NewsCard from '../NewsCard';
import './style.css';
import Auth from '../../utils/auth';

function LandingPage() {
  return (
    <div className='landing-page'>
      <h1>Welcome to Study Table</h1>
      <div className='landingPageDisplay'>
      <div className='icon-container'>
           <img className="icon" src='studyIcon.ico' alt='book icon'/>
        </div>
      <NewsCard />
      {Auth.loggedIn() ? (
        <></>
        ) : (
          <div className='buttons landing-buttons'>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/signup">
            <button>Sign up</button>
          </Link>
        </div>
      )}
        <div className='icon-container'>
           <img className="icon" src='studyIcon.ico' alt='book icon'/>
        </div>
      </div>
    </div>
    
  );
}

export default LandingPage;