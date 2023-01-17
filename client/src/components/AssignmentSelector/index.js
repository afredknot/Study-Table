import React from "react";

const AssignmentSelector = ({assignments, handleAssignmentSelect}) => {

  // ADD STATUS INDICATIOR
  return (
    <card>
      <ul>
        {assignments.map((assignment, index) => (
              <li key={index} onClick={handleAssignmentSelect}>
                <h3>{assignment.assignmentTitle}</h3>
                <p>{assignment.assignmentDueDate}</p>
              </li>
            ))}  
      </ul>
    </card>
  )
}

export default AssignmentSelector;