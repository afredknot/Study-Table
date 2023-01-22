import React, { useState, useEffect} from "react";
import StatusDropdown from "../StatusDropdown";
import CommentDisplay from "../CommentDisplay";
import CommentForm from "../CommentForm";
import "./style.css"
import AssistanceDropdown from "../AssistanceDropdown";
import { useProviderContext } from "../../utils/providerContext";
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { QUERY_ASSIGNMENT } from '../../utils/queries';


const AssignmentDetails = () => {

    const navigate = useNavigate();
    const { user, ticket, updateTicket, assignment, updateAssignment } = useProviderContext();

    const handleTicketSelect = function (e) {
        updateAssignment(e.target.id)
        // console.log(assignment)
        navigate('/assignments');
    };

    const { loading, data, error } = useQuery(QUERY_ASSIGNMENT, {
        variables: { assignmentId: assignment },
    });

    const assignmentDetails = data?.assignment || {}
    // console.log(assignmentDetails)
    // ADD STATUS INDICATIOR

    // Potentially insert chat button in this return

    return (
        <div className="assignmentDetails">

            {loading && (
                <p>Loading...</p>
            )}

            {data && (
                <div className="detailsContent">

                    {/* Header */}
                    <div className="detailsHeader">
                        <h2>Assignment Details</h2>
                        <StatusDropdown />
                        <AssistanceDropdown deets={assignmentDetails}/>
                    </div>

                    {/* Content */}
                    <div id={assignmentDetails._id} className='assignmentContent'>
                        <div className="titleField">
                            <h3>{assignmentDetails.assignmentTitle}</h3>
                            <p>due date here</p>
                            {/* NEED TO DO DATE FORMATTING */}
                            {/* <p> {assignmentDetails.assignmentDueDate}</p> */}
                        </div>
                        <p className="description"> {assignmentDetails.assignmentDescription}</p>
                    </div>

                    {/* Comments */}
                    <div className="commentContainer">
                        <h3>Comments</h3>

                        <CommentForm></CommentForm>

                        <ul>
                            {assignmentDetails.comments.map((comment) => (
                                <CommentDisplay comment={comment}>
                                </CommentDisplay>
                            ))}
                        </ul>

                    </div>

                    {/* Help Tickets */}
                    <div className="ticketContainer">
                        <h3>Tickets</h3>

                        <h3>Students Without Assistance Status</h3>
                        <ul className="assignmentDetails">
                            {assignmentDetails.studentDefaultStatus.map((student) => (
                                <li key={student._id}>
                                    <p className="tagAuth">{student.username}</p>
                                </li>
                            ))}
                        </ul>

                        <h3>Students Requesting Help With This Assignment</h3>
                        <ul className="assignmentDetails">
                            {assignmentDetails.requestingHelp.map((student) => (
                                <li key={student._id}>
                                    <p className="tagAuth">{student.username}</p>
                                </li>
                            ))}
                        </ul>

                        <h3>Students Offering Assistance on This Assignment</h3>
                        <ul className="assignmentDetails">
                            {assignmentDetails.offeringAssistance.map((student) => (
                                <li key={student._id}>
                                    <p className="tagAuth">{student.username}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {error && (
                console.log(error)
            )}
        </div>
    )
}

export default AssignmentDetails;