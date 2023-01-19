import React from "react";

import { useProviderContext } from "../../utils/providerContext";

const AssignmentSelector = ({assignments}) => {

    const { context } = useProviderContext();

  // ADD STATUS INDICATIOR
  return (
  
    <div className="card align-content-center col-3">
      <ul>
<<<<<<< HEAD
        {assignments.map((assignment) => (
              <li key={assignment.assignmentTitle} onClick={context.handleAssignmentSelect()}>
=======
        <p>this is a card for the assignments</p>
        {/* {assignments.map((assignment) => (
              <li key={assignment.assignmentTitle} onClick={handleAssignmentSelect}>
>>>>>>> b9a42630f85d64b559f53a3dae10d82231804f1c
                <h3>{assignment.assignmentTitle}</h3>
                <p>{assignment.assignmentDueDate}</p>
              </li> */}
            {/* ))}   */}
      </ul>
    
    </div>
    
  )
}

export default AssignmentSelector;