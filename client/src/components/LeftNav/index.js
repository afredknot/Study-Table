import React, { useState } from 'react';
import ClassSelector from '../ClassSelector';
import SettingsMenu from '../SettingsMenu';
import NotificationHandler from '../NotificationHandler';
import ProfileIcon from '../ProfileIcon';
import "./style.css";

// iconUrl={iconUrl} onClick={onIconClick}
// TODO CREATE LOGO ICON AND INSERT HERE
const LeftNav = ({ user }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [initialPosition, setInitialPosition] = useState(0)

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const handleTouchStart = (event) => {
        // Save the initial position of the touch event
        setInitialPosition(event.touches[0].clientX);
    };

    const handleTouchMove = (event) => {
        // Compare the current position of the touch event with the initial position
        const currentPosition = event.touches[0].clientX;
        if (initialPosition - currentPosition > 50) {
            // The user has swiped right, open the navbar
            setIsMenuOpen(true);
        }
    };

    return (
        <nav
            className={`navbar ${isMenuOpen ? 'open' : 'closed'}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
        >

            <button onClick={handleMenuClick}> {isMenuOpen ? 'Close' : 'Open'} menu </button>
            {isMenuOpen && (
                <ul>
                    <li><ProfileIcon user={user} /></li>
                    <NotificationHandler />
                    <li>Menu item 1</li>
                    <li>Menu item 2</li>
                    {/* {user.classes.map(({icon, name}) => (
                   <li>
                    <ClassSelector icon={icon} name={name}/>
                   </li> 
                ))} */}
                    <li><SettingsMenu /></li>
                </ul>
            )}

        </nav>
    )
}

export default LeftNav;