import React from "react";

const TicketSelector = ({tickets, handleTicketSelect}) => {

    return (
        <card>
            <ul>
            {tickets.map((ticket, index) => (
              <li key={index} onClick={handleTicketSelect}>
                <h3>{ticket.subject}</h3>
                <p>{ticket.assignment}</p>
                <p>{ticket.duration}</p>
                <p>{ticket.author}</p>
              </li>
            ))}  
            </ul>
        </card>
    )
}

export default TicketSelector;