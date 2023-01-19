import React, { useState } from 'react';
import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { CHANGE_ASSISTANCE_STATUS, CHANGE_PROGRESS_STATUS } from './mutations';

const ProviderContext = createContext();

export const useProviderContext = () => useContext(ProviderContext);

export const ContextProvider = ({ children }) => {

    const globalVar = { functions:[
        // global variable here
        // const navigate = useNavigate();

        // FUNCTIONS GO HERE
        function handleAssignmentSelect() {
            console.log("Clicked Assignment!");
        },

        function handleTicketSelect() {
            console.log("Clicked Ticket");
        },

        function createComment(comment) {
            console.log(comment);
        },

        function createReply(reply) {
            console.log(reply);
        },

        function ChangeProgressStatus( {currentProgressStatus, assignmentId} ) {
            const [newProgressStatus, setNewProgressStatus] = useState('');

            const [changeProgressStatus, { error }] = useMutation(CHANGE_PROGRESS_STATUS);

            const handleFormSubmit = async (event) => {
                event.preventDefault();
            
                try {
                    const { data } = await changeProgressStatus({
                    variables: {
                        assignmentId,
                        currentProgressStatus,
                        newProgressStatus,
                    },
                    });
            
                } catch (err) {
                    console.error(err);
                }
            };
        },

    
        function ChangeAssistanceStatus( {currentAssistanceStatus, assignmentId} ) {
            const [newAssistanceStatus, setNewAssistanceStatus] = useState('');

            const [changeAssistanceStatus, { error }] = useMutation(CHANGE_ASSISTANCE_STATUS);

            const handleFormSubmit = async (event) => {
                event.preventDefault();
            
                try {
                    const { data } = await changeAssistanceStatus({
                    variables: {
                        assignmentId,
                        currentAssistanceStatus,
                        newAssistanceStatus,
                    },
                    });
            
                } catch (err) {
                    console.error(err);
                }
            };
        },
        // QUERY assignment -> status buckets -> find user
        // REMOVE User -> assignment -> status bucket
        // ADD User -> assignment -> new status bucket

        function viewProfile(user) {
            console.log(user);
        },

        function handleChange(event) {
            console.log(event.target);
        },

        function veiwCourses(){
            const me = useQuery(QUERY_ME);
            const courses = me?.courses || [];
            console.log(courses);
        }
    ]}   
        
  


return (
    <ProviderContext.Provider value={globalVar} >
        {children}
    </ProviderContext.Provider>
)
}

