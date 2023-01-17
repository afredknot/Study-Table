import React from "react";

const AssignmentSelector = ({assignments, handleAssignmentSelect}) => {

  return (
    <card>
      <ul>
        {assignments.map((assignment, index) => (
              <li key={index} onClick={handleAssignmentSelect}>
                <h3>{assignment.assignmentTitle}</h3>
                <p>{assignment.assignmentDescription}</p>
                <p>{assignment.assignmentDueDate}</p>
              </li>
            ))}  
      </ul>
    </card>
  )
}

export default AssignmentSelector