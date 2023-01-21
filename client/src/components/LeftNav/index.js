import React, { useState} from 'react';
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
const LeftNav = ({  }) => {
    const navigate = useNavigate();
    const { course, updateCourse, user, updateUser, myRole, updateMyRole } = useProviderContext();

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


    const handleCourseSelect =  function(e) {
            updateCourse(e.target.id)
            setIsMenuOpen(!isMenuOpen);
            updateMyRole(role)
            navigate('/dashboard');
        };

    const { loading, data, error } = useQuery(QUERY_ME);
    const me = data?.me || {}
    const role = me.role

    const logout = (event)=>{
        event.preventDefault();
        Auth.logout();
        setIsMenuOpen(!isMenuOpen);
    
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
                        <SettingsMenu/>
                    </div>

                {/*----------------------- MAKE THIS A BUTTON TO OPEN MODAL TO CREATE COURSE --------------------*/}

                {myRole==='instructor' && (
                    <ul className='courseList'>
                    <li className='course'>Add a Course</li>
                    </ul>
                )}

                    <ul className='courseList'>
                        <li className='course'>Menu item 1</li>
                        <li className='course'>Menu item 2</li>

                        {loading && (
                            <p>Loading...</p>
                        )}

                        {data && (                        
                        <div>
                            {me.courses.map((course) => (
                        <ul key={course._id} className="courseList">
                            <li className='course'>
                            <div onClick={handleCourseSelect}>
                                {/* <img src={icon} alt={name} Icon></img> */}
                                <h2 id={course._id}>{course.courseTitle}</h2>
                            </div>
                            {/* <ClassSelector name={course.courseTitle}/> */}
                            </li>
                        </ul>))}
                        </div>
                        )}

                        {error && (
                            console.log(error)
                        )}

                    </ul>

                    <div className="navOptions">
                        <button> DOWNLOAD??? </button>
                       <div> {Auth.loggedIn() ? (
                        <>
                        <button className="btn btn-md m-2" onClick={logout}> Log Out </button>
                        </>
                        ) : (
                            <>
                            <Link className="btn btn-md m-2" to="/login">
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