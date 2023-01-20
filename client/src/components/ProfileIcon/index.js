import React from 'react';
import icon from "./profileIcon.svg"


// FIGURE OUT WHAT WE'RE DOING FOR IMAGES
const ProfileIcon = ({iconUrl, onClick}) => {
  return (
    <div onClick={onClick}>
      <img src={icon} alt="Profile Icon"></img>
    </div>
  );
}

export default ProfileIcon;