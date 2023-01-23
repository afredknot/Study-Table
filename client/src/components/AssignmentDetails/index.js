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
import dayjs from 'dayjs';

const AssignmentDetails = () => {

    const navigate = useNavigate();
    const { user, ticket, updateTicket, assignment, updateAssignment } = useProviderContext();

    const handleTicketSelect = function (e) {
        updateAssignment(e.target.id)
        navigate('/assignments');
    };

    const { loading, data, error } = useQuery(QUERY_ASSIGNMENT, {
        variables: { assignmentId: assignment },
    });

    const assignmentDetails = data?.assignment || {}
    // console.log(assignmentDetails)
    // ADD STATUS INDICATIOR

    // Potentially insert chat button in this return
    console.log(assignmentDetails)

    return (
        <div className="assignmentDetails">

            {loading && (
                <p>Loading...</p>
            )}

            {data && (
                <div className="detailsContent">

                    {/* Header */}
                    <div className="cardHeader">
                        <h3>Assignment Details</h3>
                        {/* <StatusDropdown /> */}
                    </div>
                        {/* <AssistanceDropdown deets={assignmentDetails}/> */}

                    {/* Content */}
                    <div id={assignmentDetails._id} className='assignmentContent'>
                        <div className="titleField">
                            <h3>{assignmentDetails.assignmentTitle}</h3>
                            {/* <p>due date here</p> */}
                            {/* NEED TO DO DATE FORMATTING */}
                            <p>Due: {dayjs(assignmentDetails.assignmentDueDate).format("MMMM DD, 2023")}</p>
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

                    
                {data && (
                    <div className = "selectors">
                        <ul>
                            {assignmentDetails.helpTickets.map((helpTicket) => (
                            <li key={helpTicket._id} onClick={handleTicketSelect}>
                                <h4 id={helpTicket._id} className="associatedAssignment">{assignment.assignmentTitle}</h4>
                                <p className="tagAssi">{helpTicket.topic}</p>
                                <p className="tagAssi">{helpTicket.problemDescription}</p>
                                <a href={helpTicket.githubRepo} ><p className="tagAssi">{helpTicket.githubRepo}</p> </a>
                                <p className="tagAuth">{helpTicket.student.username}</p>
                                <p className="tagDur">{helpTicket.createdAt}</p>
                            </li>
                            ))}
                        </ul>
                    </div>
                )}



                        <h3>Students Without Assistance Status</h3>
                        <ul className="">
                            {assignmentDetails.studentDefaultStatus.map((student) => (
                                <li key={student._id}>
                                    <p className="tagAuth">{student.username}</p>
                                </li>
                            ))}
                        </ul>

                        <h3>Students Requesting Help With This Assignment</h3>
                        <ul className="">
                            {assignmentDetails.requestingHelp.map((student) => (
                                <li key={student._id}>
                                    <p className="tagAuth">{student.username}</p>
                                </li>
                            ))}
                        </ul>

                        <h3>Students Offering Assistance on This Assignment</h3>
                        <ul className="">
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