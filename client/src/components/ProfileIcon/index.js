import React from 'react';


// FIGURE OUT WHAT WE'RE DOING FOR IMAGES
const ProfileIcon = ({iconUrl, onClick}) => {
  return (
    <div onClick={viewProfile}>
      <img src={iconUrl} alt="Profile Icon" />
    </div>
  );
}

export default ProfileIcon;