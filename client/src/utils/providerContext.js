import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const ProviderContext = createContext();

export const useProviderContext = () => useContext(ProviderContext);

export const ContextProvider = ({ children }) => {

    const globalVar = { functions: {
        // global variable here
        // const navigate = useNavigate();

        // FUNCTIONS GO HERE
        handleAssignmentSelect: function () {
            console.log("Clicked Assignment!");
        },

        handleTicketSelect: function () {
            console.log("Clicked Ticket");
        },

        createComment: function (comment) {
            console.log(comment);
        },

        createReply: function (reply) {
            console.log(reply);
        },

        changeStatus: function () {
            // QUERY assignment -> status buckets -> find user
            // REMOVE User -> assignment -> status bucket
            // ADD User -> assignment -> new status bucket
        },

        viewProfile: function (user) {
            console.log(user);
        },

        handleChange: function (event) {
            console.log(event.target);
        }
    }}



return (
    <ProviderContext.Provider value={globalVar} >
        {children}
    </ProviderContext.Provider>
)
}

