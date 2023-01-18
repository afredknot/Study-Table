import React from "react";
// import StatusDropdown from "./StatusDropdown"

const AssignmentDetails = ({assignmentName, assignmentDescription, assignmentDueDate}) => {

    // Potentially insert chat button in this return
    return (
        
            <div className="card col-4">
                <p>this is the card for the assignment details</p>
                {/* <h3>{assignmentName}</h3>

                <StatusDropdown />

                <p>{assignmentDueDate}</p>

                <p>{assignmentDescription}</p> */}

            </div>
       
    )
}

export default AssignmentDetails;