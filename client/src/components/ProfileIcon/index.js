import React from 'react';

// src={iconUrl} alt="Profile Icon"
// FIGURE OUT WHAT WE'RE DOING FOR IMAGES
const ProfileIcon = ({iconUrl, onClick}) => {
  return (
    <div onClick={onClick}>
      <div >icon image here</div>
    </div>
  );
}

export default ProfileIcon;