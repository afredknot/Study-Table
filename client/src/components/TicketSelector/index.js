import React from "react";

const TicketSelector = ({tickets, handleTicketSelect}) => {

    return (
      
        <div className ="card1 align-content-center col-3">
            <ul>
              <p>this is the card for holding the ticket selectors</p>
            {/* {tickets.map((ticket, index) => (
              <li key={index} onClick={handleTicketSelect}>
                <h3>{ticket.subject}</h3>
                <p>{ticket.assignment}</p>
                <p>{ticket.duration}</p>
                <p>{ticket.author}</p>
              </li>
            ))}   */}
            </ul>
        </div>
        
    )
}

export default TicketSelector;