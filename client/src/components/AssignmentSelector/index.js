import React from "react";
import "./style.css";

import { useProviderContext } from "../../utils/providerContext";

const AssignmentSelector = ({ assignments }) => {

  // const { functions } = useProviderContext();

  // ADD STATUS INDICATIOR
  return (

    <div className="card1">
      <h3>Assignments</h3>
      <ul>
        {/* <li onClick={functions.handleAssignmentSelect}>
          <h4>Big Fancy Title</h4>
          <p>Due: 1/22/23</p>
        </li>
        <li onClick={functions.handleAssignmentSelect}>
          <h4>Random Title</h4>
          <p>Due: 1/24/23</p>
        </li> */}
        {/* {assignments.map((assignment) => (
              <li key={assignment.assignmentTitle} onClick={handleAssignmentSelect}>
                <h4>{assignment.assignmentTitle}</h4>
                <p>{assignment.assignmentDueDate}</p>
              </li> */}
        {/* ))}   */}
      </ul>
    </div>

  )
}

export default AssignmentSelector;