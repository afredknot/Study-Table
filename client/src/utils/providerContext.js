import React, { useEffect, useState } from 'react';
import { createContext, useContext } from 'react';

const ProviderContext = createContext();

export const useProviderContext = () => useContext(ProviderContext);

export const ContextProvider = ({ children }) => {

    const [user, updateUser] = useState(sessionStorage.getItem('user') || '');
        useEffect(() => window.sessionStorage.setItem(`user`, user), [user]);

    const [course, updateCourse] = useState(sessionStorage.getItem('course') || '');
        useEffect(() => window.sessionStorage.setItem(`course`, course), [course]);

    const [courseTitle, updateCourseTitle] = useState(sessionStorage.getItem('courseTitle') || '');
        useEffect(() => window.sessionStorage.setItem(`courseTitle`, courseTitle), [courseTitle]);   

    const [assignment, updateAssignment] = useState(sessionStorage.getItem('assignment') || '');
        useEffect(() => window.sessionStorage.setItem(`assignment`, assignment), [assignment]);

    const [ticket, updateTicket] = useState(sessionStorage.getItem('ticket') || '');
        useEffect(() => window.sessionStorage.setItem(`ticket`, ticket), [ticket]);

    const [comment, updateComment] = useState(sessionStorage.getItem('comment') || '');
        useEffect(() => window.sessionStorage.setItem(`comment`, comment), [comment]);

    const [reply, updateReply] = useState(sessionStorage.getItem('reply') || '');
        useEffect(() => window.sessionStorage.setItem(`reply`, reply), [reply]);

    const [myRole, updateMyRole] = useState(sessionStorage.getItem('myRole') || '');
        useEffect(() => window.sessionStorage.setItem(`myRole`, myRole), [myRole]);

    const [modalVisibility, setVisibility] = useState(false);

    return (
        <ProviderContext.Provider value={{ user, course, courseTitle, assignment, ticket, comment, reply, myRole, modalVisibility, updateUser, updateCourse, updateCourseTitle, updateAssignment, updateTicket, updateComment, updateReply, updateMyRole, setVisibility }} >
            {children}
        </ProviderContext.Provider>
    )
}

