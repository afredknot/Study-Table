import React from "react";

const TicketSelector = ({tickets, handleTicketSelect}) => {

    return (
      
        <div className ="card1 align-content-center col-3">
          <h3>Open Tickets</h3>
            <ul>
              <li>
                <h4>This is a ticket subject</h4>
                <p>This is the author</p>
                <p>created 3 hours ago</p>
                <p>associated assignment</p>
              </li>
              <li>
                <h4>This is another ticket</h4>
                <p>This is the author</p>
                <p>created 10 hours ago</p>
                <p>associated assignment</p>
              </li>
            {/* {tickets.map((ticket, index) => (
              <li key={index} onClick={handleTicketSelect}>
                <h4>{ticket.subject}</h4>
                <p>{ticket.author}</p>
                <p>{ticket.duration}</p>
                <p>{ticket.assignment}</p>
              </li>
            ))}   */}
            </ul>
        </div>
        
    )
}

export default TicketSelector;