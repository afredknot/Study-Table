import React from "react";

import { useProviderContext } from "../../utils/providerContext";

const AssignmentSelector = ({assignments}) => {

    const { context } = useProviderContext();

  // ADD STATUS INDICATIOR
  return (
    <card>
      <ul>
        {assignments.map((assignment) => (
              <li key={assignment.assignmentTitle} onClick={context.handleAssignmentSelect()}>
                <h3>{assignment.assignmentTitle}</h3>
                <p>{assignment.assignmentDueDate}</p>
              </li>
            ))}  
      </ul>
    </card>
  )
}

export default AssignmentSelector;