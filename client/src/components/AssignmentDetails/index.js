import React from "react";
import StatusDropdown from "../StatusDropdown"

import { useProviderContext } from "../../utils/providerContext";
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { QUERY_ASSIGNMENT } from '../../utils/queries';


const AssignmentDetails = () => {

    const navigate = useNavigate();
    const { ticket, updateTicket, assignment, updateAssignment } = useProviderContext();

    const handleTicketSelect =  function(e) {
        updateAssignment(e.target.id)
        console.log(assignment)
        navigate('/assignments');
    };

    const { loading, data, error } = useQuery(QUERY_ASSIGNMENT, {
        variables: { assignmentId: assignment },
    });

    const assignmentDetails = data?.assignment || {}
    console.log(assignmentDetails)
  // ADD STATUS INDICATIOR

    // Potentially insert chat button in this return
    
    return (
        
        <div className="card col-4">
            
            <StatusDropdown />

            <p>this is the card for the assignment details</p>

            {loading && (
                <p>Loading...</p>
            )}
  
            {data && (                        
                <div className="card1">
                    <h3>Assignment Details</h3>

                    <ul  className="assignmentDetails">
                        <li id={assignmentDetails._id} onClick={handleTicketSelect} className='assignment'>
                            <div  >
                            {/* <img src={icon} alt={name} Icon></img> */}
                            <h3>{assignmentDetails.assignmentTitle}</h3>
                            <p> {assignmentDetails.assignmentDescription}</p>
                            <p> {assignmentDetails.assignmentDueDate}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            )}
  
            <h3>Comments</h3>

                {data && (

                <ul>
                    {assignmentDetails.comments.map((comment) => (
                        <div key = {comment._id}>
                            <h4  id= {comment._id} className="comment">{comment.commentText}</h4>
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

                {/* <h3>{assignmentName}</h3>

                <StatusDropdown />

                <p>{assignmentDueDate}</p>

                <p>{assignmentDescription}</p> */}

            </div>
       
    )
}

export default AssignmentDetails;