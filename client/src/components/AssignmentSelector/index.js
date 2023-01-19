import React from "react";
import "./style.css";

import { useProviderContext } from "../../utils/providerContext";

const AssignmentSelector = ({assignments}) => {

    // const { context } = useProviderContext();

  // ADD STATUS INDICATIOR
  return (
  
    <div className="card1 align-content-center col-3">
      <h3>Assignments</h3>
      <ul>
        <li>This is one</li>
        <li>This is another</li>
        {/* {assignments.map((assignment) => (
              <li key={assignment.assignmentTitle} onClick={handleAssignmentSelect}>
                <h3>{assignment.assignmentTitle}</h3>
                <p>{assignment.assignmentDueDate}</p>
              </li> */}
            {/* ))}   */}
      </ul>
    </div>
    
  )
}

export default AssignmentSelector;