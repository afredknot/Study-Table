import React, { useEffect } from "react";
import "./style.css";

import { useProviderContext } from "../../utils/providerContext";
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { QUERY_COURSE } from '../../utils/queries';


const AssignmentSelector = ({ assignments }) => {

  const navigate = useNavigate();
  const { course, updateCourse, assignment, updateAssignment, courseTitle, updateCourseTitle } = useProviderContext();
  // const { functions } = useProviderContext();

  const handleAssignmentSelect = function (e) {
    // console.log(e.target.id);
    updateAssignment(e.target.id)
    // console.log(assignment)
    // setIsMenuOpen(!isMenuOpen);
    navigate('/assignments');
  };

  
  const { loading, data, error } = useQuery(QUERY_COURSE, {
    variables: { courseId: course },
  });
  // console.log(data)
  const assignmentList = data?.course.assignments || {}
  // console.log(assignmentList)
  // ADD STATUS INDICATIOR
  const courseName = data?.course.courseTitle || {}

  useEffect(() => {
    updateCourseTitle(courseName)
  }, [course]
  )



  return (


    <div>

      {loading && (
        <p>Loading...</p>
      )}

      {data && (
        <div className="selectors no-scroll">
          <div className="cardHeader">
            <h3>Assignments</h3>
          </div>

          <ul className="assignmentList">

            {assignmentList.map((assignment) => (
              <li key={assignment._id} className='assignment' onClick={handleAssignmentSelect}>

                <h4 id={assignment._id} className="assignmentTitle" >{assignment.assignmentTitle}</h4>

              </li>
            ))}

          </ul>
        </div>
      )}

      {error && (
        console.log(error)
      )}

    </div>
  )
}


export default AssignmentSelector;