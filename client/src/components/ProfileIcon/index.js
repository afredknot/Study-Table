import React from 'react';
import icon from "./profileIcon.svg"
import { useProviderContext } from '../../utils/providerContext';

const ProfileIcon = () => {

  const { setVisibility, modalVisibility } = useProviderContext();

  const handleProfileClick = () => {
    setVisibility(!modalVisibility);
  }
  
  return (
    <div className='navButton' onClick={handleProfileClick}>
      <img src={icon} alt="Profile Icon"></img>
    </div>
  );
}

export default ProfileIcon;