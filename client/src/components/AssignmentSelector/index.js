import React from "react";
import "./style.css";

const AssignmentSelector = ({ assignments }) => {


  // ADD STATUS INDICATIOR
  return (

    <div className="selectors">
      <h3>Assignments</h3>
        <ul>
          <li>
            <h4 className="courseTitle">Big Fancy Title</h4>
            <p className="due">Due: 1/22/23</p>
          </li>
          <li>
            <h4 className="courseTitle">Random Title</h4>
            <p className="due">Due: 1/24/23</p>
          </li>
          <li>
            <h4 className="courseTitle">Big Fancy Title</h4>
            <p className="due">Due: 1/22/23</p>
          </li>
          <li>
            <h4 className="courseTitle">Random Title</h4>
            <p className="due">Due: 1/24/23</p>
          </li>
          <li>
            <h4 className="courseTitle">Big Fancy Title</h4>
            <p className="due">Due: 1/22/23</p>
          </li>
          <li>
            <h4 className="courseTitle">Random Title</h4>
            <p className="due">Due: 1/24/23</p>
          </li>
          <li>
            <h4 className="courseTitle">Big Fancy Title</h4>
            <p className="due">Due: 1/22/23</p>
          </li>
          <li>
            <h4 className="courseTitle">Random Title</h4>
            <p className="due">Due: 1/24/23</p>
          </li>
          <li>
            <h4 className="courseTitle">Big Fancy Title</h4>
            <p className="due">Due: 1/22/23</p>
          </li>
          <li>
            <h4 className="courseTitle">Random Title</h4>
            <p className="due">Due: 1/24/23</p>
          </li>
          <li>
            <h4 className="courseTitle">Big Fancy Title</h4>
            <p className="due">Due: 1/22/23</p>
          </li>
          <li>
            <h4 className="courseTitle">Random Title</h4>
            <p className="due">Due: 1/24/23</p>
          </li>
          {/* {assignments.map((assignment) => (
              <li key={assignment.assignmentTitle} onClick={handleAssignmentSelect}>
                <h4>{assignment.assignmentTitle}</h4>
                <p className="due">{assignment.assignmentDueDate}</p>
              </li> */}
          {/* ))}   */}
        </ul>
    </div>

  )
}

export default AssignmentSelector;