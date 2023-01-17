import React from "react";
import StatusDropdown from "./StatusDropdown"

const AssignmentDetails = ({assignmentName, assignmentDescription, assignmentDueDate}) => {

    // Potentially insert chat button in this return
    return (
        <card>
            <div>
                <h3>{assignmentName}</h3>

                <StatusDropdown />

                <p>{assignmentDueDate}</p>

                <p>{assignmentDescription}</p>

            </div>
        </card>
    )
}

export default AssignmentDetails;