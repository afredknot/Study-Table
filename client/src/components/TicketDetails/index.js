import React, { useState } from "react";
import CommentDisplay from "../CommentDisplay";

import { useProviderContext } from "../../utils/providerContext";
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { QUERY_TICKET } from '../../utils/queries';

const TicketDetails = () => {

    const navigate = useNavigate();
    const { ticket, updateTicket, assignment, updateAssignment, comment, updateComment } = useProviderContext();

    const handleCommentSelect =  function(e) {
        // console.log(e.target.id);
            updateComment(e.target.id)
            // console.log(assignment)
            // setIsMenuOpen(!isMenuOpen);
            navigate('/assignments');
    };

    const { loading, data, error } = useQuery(QUERY_TICKET, {
        variables: { id: ticket },
    });
    console.log(data)
    const ticketDetails = data?.helpTicket || {}
    console.log(ticketDetails)

      // ADD STATUS INDICATIOR
    return (
        <div className ="container">
        <div className ="card col-6">
            {/* <p> this is the container for the ticket details</p> */}
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
            <div>

            {loading && (
            <p>Loading...</p>
            )}

  
            {data && (                        
                <div className="card1 selector">
                    <h3>Ticket Details</h3>

                    <ul  className="ticketDetails">
                        <li id={ticketDetails._id} className='assignment'>
                            <div  >
                            {/* <img src={icon} alt={name} Icon></img> */}
                            <h3> {ticketDetails.topic}</h3>
                            <p> {ticketDetails.student.username}</p>
                            <p> {ticketDetails.githubRepo}</p>
                            <p> {ticketDetails.problemDescription}</p>
                            <p> {ticketDetails.createdAt}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            )}


            <h3>Comments</h3>

            {data && (

            <ul>
                {ticketDetails.comments.map((comment) => (
                    <div>
                        <h4 key = {comment._id} id= {comment._id} className="comment">{comment.commentText}</h4>
                        <h5>{comment.commentAuthor}</h5>
                        <h5>{comment.createdAt}</h5>
                       {comment.replies.map((reply) => (
                            <li key= {reply._id}>
                                <p className="tagAuth">{reply.replyText}</p>
                                <p className="tagAssi">{reply.replyAuthor}</p>
                                <p className="tagDur">{reply.createdAt}</p>
                            </li>
                        ))}
                    </div>
                ))}
            </ul>

            )}


            {error && (
            console.log(error)
            )}

            </div>


            <CommentDisplay />
        </div>
        </div>
    )
}

export default TicketDetails;