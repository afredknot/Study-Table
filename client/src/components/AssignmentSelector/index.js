import React from "react";

const AssignmentSelector = ({assignments, handleAssignmentSelect}) => {

  // ADD STATUS INDICATIOR
  return (
    <card>
      <ul>
        {assignments.map((assignment) => (
              <li key={assignment.assignmentTitle} onClick={handleAssignmentSelect}>
                <h3>{assignment.assignmentTitle}</h3>
                <p>{assignment.assignmentDueDate}</p>
              </li>
            ))}  
      </ul>
    </card>
  )
}

export default AssignmentSelector;