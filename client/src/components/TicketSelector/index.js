import React from "react";
import "./style.css"

const TicketSelector = ({tickets, handleTicketSelect}) => {

    return (
      
        <div className ="selectors">
          <h3>Open Tickets</h3>
            <ul>
              <li>
                <h4>associated assignment</h4>
                <p className="tagAuth">This is the author</p>
                <p className="tagAssi">This is a ticket subject</p>
                <p className="tagDur">created 3 hours ago</p>
              </li>
              <li>
                <h4>associated assignment</h4>
                <p className="tagAuth">This is the author</p>
                <p className="tagAssi">This is another ticket</p>
                <p className="tagDur">created 10 hours ago</p>
              </li>
            {/* {tickets.map((ticket, index) => (
              <li key={index} onClick={handleTicketSelect}>
                <h4>{ticket.assignment}</h4>
                <p className="tagAuth">{ticket.author}</p>
                <p className="tagAssi">{ticket.subject}</p>
                <p className="tagDur">{ticket.duration}</p>
              </li>
            ))}   */}
            </ul>
        </div>
        
    )
}

export default TicketSelector;