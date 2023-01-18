import React from "react";

const AssignmentSelector = ({assignments, handleAssignmentSelect}) => {

  // ADD STATUS INDICATIOR
  return (
   <div className="container">
    <div className="card align-content-center col-3">
      <ul>
        <p>this is a card for the assignments</p>
        {/* {assignments.map((assignment) => (
              <li key={assignment.assignmentTitle} onClick={handleAssignmentSelect}>
                <h3>{assignment.assignmentTitle}</h3>
                <p>{assignment.assignmentDueDate}</p>
              </li> */}
            {/* ))}   */}
      </ul>
    
    </div>
    </div>
  )
}

export default AssignmentSelector;