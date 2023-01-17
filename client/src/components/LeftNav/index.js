import React from 'react';
import ClassSelector from '../ClassSelector';
import SettingsMenu from './SettingsMenu';
import NotificationHandler from '../NotificationHandler';
import ProfileIcon from './ProfileIcon';


// TODO CREATE LOGO ICON AND INSERT HERE
const LeftNav = ({ iconUrl, onIconClick, user,  }) => {

    return (
        <nav>
            <ProfileIcon iconUrl={iconUrl} onClick={onIconClick} />
            <NotificationHandler />

            <ul>
                {user.classes.map(({icon, name}) => (
                   <li>
                    <ClassSelector icon={icon} name={name}/>
                   </li> 
                ))}
            </ul>

            <SettingsMenu />
        </nav>
    )
}

export default LeftNav;