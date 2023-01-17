import React from 'react';

const ProfileIcon = ({iconUrl, onClick}) => {
  return (
    <div onClick={onClick}>
      <img src={iconUrl} alt="Profile Icon" />
    </div>
  );
}

export default ProfileIcon;