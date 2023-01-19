import React, { useState } from 'react';
import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { CHANGE_ASSISTANCE_STATUS, CHANGE_PROGRESS_STATUS } from './mutations';
import { QUERY_ME} from './queries';

const ProviderContext = createContext();

export const useProviderContext = () => useContext(ProviderContext);

export const ContextProvider = ({ children }) => {

    const globalVar = { functions: {
        // global variable here
        // const navigate = useNavigate();

        // FUNCTIONS GO HERE
        handleAssignmentSelect: function() {
            console.log("Clicked Assignment!");
        },

        handleTicketSelect: function() {
            console.log("Clicked Ticket");
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
        // QUERY assignment -> status buckets -> find user
        // REMOVE User -> assignment -> status bucket
        // ADD User -> assignment -> new status bucket

        viewProfile: function(user) {
            console.log(user);
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

