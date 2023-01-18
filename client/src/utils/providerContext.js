import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const providerContext = createContext();

export const useProviderContext = () => useContext(providerContext);

export const contextProvider = ({ children }) => {

    // global variable here
    const navigate = useNavigate();

    // FUNCTIONS GO HERE
    function handleAssignmentSelect() {
        console.log("Clicked Assignment!");
    };

    function handleTicketSelect() {
        console.log("Clicked Ticket");
    };

    function createComment(comment) {
        console.log(comment);
    };

    function createReply(reply) {
        console.log(reply);
    };

    function changeStatus() {
        // QUERY assignment -> status buckets -> find user
        // REMOVE User -> assignment -> status bucket
        // ADD User -> assignment -> new status bucket
    };

    function viewProfile(user) {
        console.log(user);
    };

    function handleChange(event) {
        console.log(event.target);
    };

    return (
        <providerContext.Provider value={{ navigate, handleAssignmentSelect, handleTicketSelect, createComment, createReply, changeStatus, viewProfile, handleChange }} >
            {children}
        </providerContext.Provider>
    )
}

