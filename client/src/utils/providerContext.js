import { useQuery } from '@apollo/client';
import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

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

        function changeStatus() {
            // QUERY assignment -> status buckets -> find user
            // REMOVE User -> assignment -> status bucket
            // ADD User -> assignment -> new status bucket
        },

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

