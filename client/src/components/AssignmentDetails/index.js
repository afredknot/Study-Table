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
        
        <div className= "col-8">
            
            <StatusDropdown />


            {loading && (
                <p>Loading...</p>
            )}
  
            {data && (                        
                <div className="card col-4 selectors">
                    <h3>Assignment Details</h3>

                    <ul  className="assignmentDetails">
                        <li id={assignmentDetails._id} onClick={handleTicketSelect} className='assignment'>
                            <div  >
                            {/* <img src={icon} alt={name} Icon></img> */}
                            <h3>{assignmentDetails.assignmentTitle}</h3>
                            <p> {assignmentDetails.assignmentDescription}</p>
                            
                            {/* NEED TO DO DATE FORMATTING */}
                            {/* <p> {assignmentDetails.assignmentDueDate}</p> */}
                            </div>
                        </li>
                    </ul>
                </div>
            )}
  

                {data && (
                    <div className="card selectors">
                    <h3>Comments</h3>
                <ul>
                    {assignmentDetails.comments.map((comment) => (
                        <div key = {comment._id}>
                            <li>
                                <h4  id= {comment._id} className="comment">{comment.commentText}</h4>
                                <h5>{comment.commentAuthor}</h5>
                                <h5>{comment.createdAt}</h5>
                            </li>
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
            </div>
                )}
          {data && (
              <div className="card selectors">
                <h2>Student Assistance Requests</h2>
                <h3>Students Without Assistance Status</h3>
                    <ul  className="assignmentDetails">
                        {assignmentDetails.studentDefaultStatus.map((student) => (
                            <li key= {student._id}>
                                <p className="tagAuth">{student.username}</p>
                            </li>
                        ))}
                    </ul>

                <h3>Students Requesting Help With This Assignment</h3>
                    <ul  className="assignmentDetails">
                        {assignmentDetails.requestingHelp.map((student) => (
                            <li key= {student._id}>
                                <p className="tagAuth">{student.username}</p>
                            </li>
                        ))}
                    </ul>
                
                <h3>Students Offering Assistance on This Assignment</h3>
                    <ul  className="assignmentDetails">
                        {assignmentDetails.offeringAssistance.map((student) => (
                            <li key= {student._id}>
                                <p className="tagAuth">{student.username}</p>
                            </li>
                        ))}
                    </ul>


                </div>


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