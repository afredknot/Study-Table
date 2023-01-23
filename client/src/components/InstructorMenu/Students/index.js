import React from "react";
import "./style.css";

import { useProviderContext } from "../../../utils/providerContext";
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { QUERY_COURSE } from '../../../utils/queries';


const Students = ({ assignments }) => {

  const navigate = useNavigate();
  const { course, updateCourse, assignment, updateAssignment } = useProviderContext();
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
  console.log(data)
  const studentList = data?.course.students || {}
  console.log(studentList)
  // ADD STATUS INDICATIOR
  return (


    <div>

      {loading && (
        <p>Loading...</p>
      )}

      {data && (
        <div className="selectors no-scroll">
          <div className="cardHeader">
            <h3>Students</h3>
          </div>

          <ul className="studentList">

            {studentList.map((student) => (
              <li key={student._id} className='assignment'>

                <h4 id={student._id} className="studentName" >{student.firstName} {student.lastName}</h4>

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


export default Students;