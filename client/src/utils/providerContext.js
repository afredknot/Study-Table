import React, { useState } from 'react';
import { createContext, useContext } from 'react';

import { useMutation, useQuery } from '@apollo/client';

import { CHANGE_ASSISTANCE_STATUS, CHANGE_PROGRESS_STATUS } from './mutations';


const ProviderContext = createContext();

export const useProviderContext = () => useContext(ProviderContext);

export const ContextProvider = ({ children }) => {

    const globalVar = { functions: {
        // global variable here
        // const navigate = useNavigate();

        // FUNCTIONS GO HERE
        handleAssignmentSelect: function() {
            console.log("Clicked Assignment!");

            // query individual assignment and assignment tickets
        },

        handleCourseSelect: function() {
            console.log("Clicked Assignment!");

            // query individual course populate assignments and tickets
        },

        handleTicketSelect: function() {
            console.log("Clicked Ticket");
            // query individual ticket and get details
        },

        createComment: function(comment) {
            console.log(comment);
        },

        createReply: function(reply) {
            console.log(reply);
        },

        ChangeProgressStatus: function( {currentProgressStatus, assignmentId} ) {
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

    
        ChangeAssistanceStatus: function( {currentAssistanceStatus, assignmentId} ) {
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


        viewProfile: function() {
            console.log(user);
            // ??? QUERY_ME

        },

        handleChange: function(event) {
            console.log(event.target);
        },

        useAQuery: function (query){
            const result = useQuery(query);
            return result
        }
    }   
  }     
  


return (
    <ProviderContext.Provider value={globalVar} >
        {children}
    </ProviderContext.Provider>
)
}

