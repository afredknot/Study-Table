import React, { useState } from 'react';
import { createContext, useContext } from 'react';

import { useMutation, useQuery } from '@apollo/client';

import { ADD_COMMENT, ADD_REPLY, CHANGE_ASSISTANCE_STATUS, CHANGE_PROGRESS_STATUS, UPDATE_HELP_TICKET } from './mutations';
import { QUERY_ASSIGNMENT, QUERY_COURSE, QUERY_TICKET } from './queries';


const ProviderContext = createContext();

export const useProviderContext = () => useContext(ProviderContext);

export const ContextProvider = ({ children }) => {

    const globalVar = { functions: {

        // query individual assignment and assignment tickets
        HandleAssignmentSelect: function(assignmentId) {
            
            const { loading, data } = useQuery(QUERY_ASSIGNMENT, {
                variables: { assignmentId: assignmentId },
            });

            const assignment = data?.assignment || {};
            console.log(assignment)
            console.log("Clicked Assignment!");
        },
        
        
        // // query individual course populate assignments and tickets
        HandleCourseSelect: function(courseId) {
            const { loading, data } = useQuery(QUERY_COURSE, {
                variables: { courseId: courseId },
            });

            const course = data?.course || {};
            console.log(course)
            console.log("Clicked Course");

            // return assignment, ticket, newsfeed components
            // close nav bar

        },


        // // query individual ticket and get details
        // handleTicketSelect: function(helpTicketId) {
        //     const { loading, data } = useQuery(QUERY_TICKET, {
        //         variables: { id: helpTicketId },
        //     });

        //     const ticket = data?.helpTicket || {};
        //     console.log(ticket)
        //     console.log("Clicked Ticket");
        // },

        CreateComment: function(assignmentId, helpTicketId) {
            const [commentState, setCommentState] = useState('');
            const [addComment, { error, data }] = useMutation(ADD_COMMENT);
            
            // const handleChange = (event) => {
            //     const { name, value } = event.target;
            //     setCommentState({comment});
            // };
            
            // const handleFormSubmit = async (event) => {
            //     event.preventDefault();
                try {
                    const { data } = addComment({
                        variables: { 
                            assignmentId: "63c8a1e1003d5a5cd2a758a4",
                            helpTicketId,
                            commentText: "Test Comment"
                        },
                    });
                } catch (e) {
                    console.error(e);
                }
            // };
        },

        // createReply: function(commentId) {
        //     const [replyState, setReplyState] = useState('');
        //     const [addReply, { error, data }] = useMutation(ADD_REPLY);
            
        //     const handleChange = (event) => {
        //         const { name, value } = event.target;
        //         setCommentState({reply});
        //         };
            
        //         const handleFormSubmit = async (event) => {
        //         event.preventDefault();
            
        //         try {
        //             const { data } = await addReply({
        //             variables: { 
        //                 commentId,
        //                 replyText: replyState
        //                 },
        //             });
            
        //         } catch (e) {
        //             console.error(e);
        //         }
        //     };
        // },

        ChangeProgressStatus: function( {currentProgressStatus, assignmentId} ) {
            
            //   progress statuses are: "studentProgressNotStarted", "studentProgressWorking", and "studentProgressCompleted"
            
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

    
        // changeAssistanceStatus: function( {currentAssistanceStatus, assignmentId} ) {
        //     //   progress statuses are: "studentDefaultStatus", "requestingHelp", and "offeringAssistance"
            
        //     const [newAssistanceStatus, setNewAssistanceStatus] = useState('');
        //     const [changeAssistanceStatus, { error }] = useMutation(CHANGE_ASSISTANCE_STATUS);

        //     const handleFormSubmit = async (event) => {
        //         event.preventDefault();
            
        //         try {
        //             const { data } = await changeAssistanceStatus({
        //             variables: {
        //                 assignmentId,
        //                 currentAssistanceStatus,
        //                 newAssistanceStatus,
        //             },
        //             });
            
        //         } catch (err) {
        //             console.error(err);
        //         }
        //     };
        // },

        
        // updateHelpTicket: function( { helpTicketId } ) {
        //     // ticketOpen/ticketStatus are Boolean where true=open ticket

        //     const [topic, setSubject] = useState("");
        //     const [repo, setRepo] = useState("");
        //     const [body, setBody] = useState("");
        //     const [ticketOpen, setTicketOpen] = useState(true);

        //     const [updateHelpTicket, { error, data }] = useMutation(UPDATE_HELP_TICKET);
          
        //     const handleChange = (e) => {
        //       switch(e.target.id) {
        //         case "1":
        //             setSubject(e.target.value);
        //             break;
        //         case "2":
        //             setRepo(e.target.value);
        //             break;
        //         case "3":
        //             setBody(e.target.value);
        //             break;
        //         case "4":
        //             setTicketOpen(e.target.value);
        //             break;
        //         };
        //     };
          
        //     const handleSubmit = async(e) => {
        //       e.preventDefault();
        //       // SUBMITTED DATA
        //       try {
        //         const { data } = await updateHelpTicket({
        //           variables: {
        //             helpTicketId: helpTicketId,
        //             topic: topic,
        //             githubRpo: repo,
        //             problemDescription: body,
        //             ticketStatus: ticketOpen
        //           },
        //         });
          
        //       } catch (e) {
        //         console.error(e);
        //       }
          
        //       // MUTATE HERE
        //       setSubject("");
        //       setRepo("");
        //       setBody("");
        //       // send success message and return to ???
        //     };
        // },

        // viewProfile: function() {
        //     console.log(user);
        //     // ??? QUERY_ME

        // },

        // handleChange: function(event) {
        //     console.log(event.target);
        // },
        useAMutation: function (mutation, options){
            const result = useMutation(mutation, options);
            return result
        },

        useAQuery: function (query, options){
            const result = useQuery(query, options);
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

