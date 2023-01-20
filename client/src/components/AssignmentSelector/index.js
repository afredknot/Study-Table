import React from "react";
import "./style.css";

import { useProviderContext } from "../../utils/providerContext";
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { QUERY_COURSE } from '../../utils/queries';


const AssignmentSelector = ({ assignments }) => {

    const navigate = useNavigate();
    const { course, updateCourse, assignment, updateAssignment } = useProviderContext();
  // const { functions } = useProviderContext();

    const handleAssignmentSelect =  function(e) {
        // console.log(e.target.id);
            updateAssignment(e.target.id)
            console.log(assignment)
            // setIsMenuOpen(!isMenuOpen);
            navigate('/assignments');
    };

    const { loading, data, error } = useQuery(QUERY_COURSE, {
        variables: { courseId: course },
    });
  // console.log(data)
  const assignmentList = data?.course.assignments || {}
  console.log(assignmentList)
  // ADD STATUS INDICATIOR
  return (

    
    <div>
  
      {loading && (
          <p>Loading...</p>
      )}
  
      {data && (                        
      <div className="card1">
  <h3>Assignments</h3>
          {assignmentList.map((assignment) => (
      <ul key={assignment._id} className="assignmentList">
          <li className='assignment'>
          <div onClick={handleAssignmentSelect}>
              {/* <img src={icon} alt={name} Icon></img> */}
              <h2 id={assignment._id}>{assignment.assignmentTitle}</h2>
 
          </div>
          {/* <ClassSelector name={course.courseTitle}/> */}
          </li>
      </ul>))}
      </div>
      )}
  
      {error && (
          console.log(error)
      )}
  
      </div>
    )
  }
  

export default AssignmentSelector;