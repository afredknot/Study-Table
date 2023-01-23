import React, { useState, useEffect } from 'react';
// import ClassSelector from '../ClassSelector';
import SettingsMenu from '../SettingsMenu';
import NotificationHandler from '../NotificationHandler';
import ProfileIcon from '../ProfileIcon';
import "./style.css";
import { QUERY_ME } from '../../utils/queries';
import { useProviderContext } from "../../utils/providerContext";
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Auth from "../../utils/auth"
import { Link } from 'react-router-dom';

// iconUrl={iconUrl} onClick={onIconClick}
// TODO CREATE LOGO ICON AND INSERT HERE

const LeftNav = ({ }) => {
    const navigate = useNavigate();
    const { course, updateCourse, user, updateUser, myRole, updateMyRole, modalVisibility, setVisibility, setIsMenuOpen, isMenuOpen} = useProviderContext();

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

    useEffect(() => {
        setIsMenuOpen(!isMenuOpen);
        updateMyRole(role)
    }, [course]);
    
    const handleCourseSelect = function (e) {
        updateCourse(e.target.id)
        setTimeout(() => {
            navigate('/dashboard');
          }, 500);

    };

    const { loading, data, error } = useQuery(QUERY_ME);
    const me = data?.me || {}
    // console.log(me)
    const role = me.role


    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
        setIsMenuOpen(!isMenuOpen);

    };

    function openInstructorTools() {
        setVisibility("instructor");
    }

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

                    {role === 'instructor' && (
                        <button onClick={openInstructorTools}>Instructor Tools</button>
                    )}


                    <ul className='courseList'>

                        {loading && (
                            <p>Loading...</p>
                        )}

                        {data && (
                            <div>
                                <h2>Welcome, {me.firstName}</h2>
                                <ul key={course._id} className="courseList">
                                    {me.courses.map((course) => (
                                        <li id={course._id} className='course' onClick={handleCourseSelect}>
                                            <h3 className="courseName" id={course._id}>{course.courseTitle}</h3>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {error && (
                            console.log(error)
                        )}

                    </ul>

                    <div className="navOptions">

                        <div> {Auth.loggedIn() ? (
                            <>
                                <button className="logButton" onClick={logout}> Log Out </button>
                            </>
                        ) : (
                            <>
                                <Link className="logButton" onClick={handleMenuClick} to="/login">
                                    Login
                                </Link>
                            </>
                        )}

                        </div>
                    </div>
                </div>
            )}

        </nav>
    )
}

export default LeftNav;