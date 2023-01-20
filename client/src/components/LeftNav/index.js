import React, { useState } from 'react';
import ClassSelector from '../ClassSelector';
import SettingsMenu from '../SettingsMenu';
import NotificationHandler from '../NotificationHandler';
import ProfileIcon from '../ProfileIcon';
import "./style.css";

// iconUrl={iconUrl} onClick={onIconClick}
// TODO CREATE LOGO ICON AND INSERT HERE
const LeftNav = ({ user }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const [initialPosition, setInitialPosition] = useState(0)

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const handleTouchStart = (event) => {
        // Save the initial position of the touch event
        setInitialPosition(event.touches[0].clientX);
    };

    const handleTouchMove = (event) => {
        // Save the current position of the user's touch
        const currentPosition = event.touches[0].clientX;

        // Compare the current position of the touch event with the initial position
        if (initialPosition - currentPosition < -50) {
            // The user has swiped right, open the navbar
            setIsMenuOpen(true);
            console.log("opening menu");
        }

    };

    return (
        <nav
            className={`navbar ${isMenuOpen ? 'open' : 'closed'}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
        >

            <button className="handle" onClick={handleMenuClick}>{isMenuOpen ? "Close" : "Menu"}</button>

            {isMenuOpen && (
                <div className='navContent'>
                    <div className='navButtons'>
                        <ProfileIcon user={user} />
                        <NotificationHandler />
                        <SettingsMenu />
                    </div>
                    <ul className='courseList'>
                        <li className='course'>Menu item 1</li>
                        <li className='course'>Menu item 2</li>
                        {/* {user.classes.map(({icon, name}) => (
                   <li className='course'>
                    <ClassSelector icon={icon} name={name}/>
                   </li> 
                ))} */}
                    </ul>
                    
                    <div className="navOptions">
                        <button> DOWNLOAD??? </button>
                        <button> Log Out </button>
                    </div>
                </div>
            )}

        </nav>
    )
}

export default LeftNav;