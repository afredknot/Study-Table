import React, { useState } from "react";
import CommentDisplay from "../CommentDisplay";

const TicketDetails = ({ticket, user}) => {

    // const [status, changeStatus] = useState("Unresolved");

    // function handleChange(e) {
    //     changeStatus(e.target.value);
    //     //MUTATION ON DB
    // }

    return (
        <div className ="container">
        <div className ="card col-6">
            <p> this is the container for the ticket details</p>
            {/* <h2>{ticket.subject}</h2>

            <p>{ticket.author}</p>

            {(user === ticket.author)?
            <select value={status} onChange={handleChange}>
                <option value="Unresolved" style={{ color: "red" }}>Unresolved</option>
                <option value="Re-Opened" style={{ color: "orange" }}>Re-Opened</option>
                <option value="Solved" style={{ color: "green" }}>Solved</option>
            </select>
            
            : <p>{ticket.status}</p>}

            <a href={ticket.repo}>Repo Link</a>

            <p>{ticket.body}</p> */}

            <CommentDisplay />
        </div>
        </div>
    )
}

export default TicketDetails;