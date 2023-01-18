import React from 'react';
import ClassSelector from '../ClassSelector';
import SettingsMenu from '../SettingsMenu';
import NotificationHandler from '../NotificationHandler';
import ProfileIcon from '../ProfileIcon';

// iconUrl={iconUrl} onClick={onIconClick}
// TODO CREATE LOGO ICON AND INSERT HERE
const LeftNav = ({ iconUrl, onIconClick, user  }) => {

    return (
        <nav>
            <ProfileIcon  />
            <NotificationHandler />

            <ul>
                {/* {user.classes.map(({icon, name}) => (
                   <li>
                    <ClassSelector icon={icon} name={name}/>
                   </li> 
                ))} */}
            </ul>

            <SettingsMenu />
        </nav>
    )
}

export default LeftNav;