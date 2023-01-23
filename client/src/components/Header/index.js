import React, { useState } from 'react';
import { useProviderContext } from '../../utils/providerContext';
import { Link } from 'react-router-dom';

import "./style.css";

const Header = ({ title }) => {

  const { modalVisibility, setVisibility } = useProviderContext();

  const closeModal = () => setVisibility(!modalVisibility);

  return (
    <header>
      <Link to="/">
        <h1 className="pageTitle">Study Table</h1>
        </Link>
      {modalVisibility && (
        <div className='modal'>
          <p>Feature coming soon! For now this is just a placeholder!</p>
          <button onClick={closeModal}>Okay!</button>
        </div>
      )}
    </header>
  );
}

export default Header;