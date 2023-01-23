import React, { useState } from 'react';
import { useProviderContext } from '../../utils/providerContext';
import "./style.css";

const Header = ({ title }) => {

  const { modalVisibility, setVisibility } = useProviderContext();

  const closeModal = () => setVisibility(!modalVisibility);

  return (
    <header>
      <h1 className="pageTitle">Study Table</h1>
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