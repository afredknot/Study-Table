import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
import { useProviderContext } from "../../../utils/providerContext";
import { useMutation, useQuery } from '@apollo/client';
import { ADD_STUDENT_TO_COURSE } from '../../../utils/mutations';
import { QUERY_STUDENTS } from '../../../utils/queries';


const AddStudentToCourse = (courseId) => {

  const { course } = useProviderContext();

  const [userSelected, setUserSelected] = useState();

  const { data} = useQuery(QUERY_STUDENTS);

  const allStudents = data?.students || [];

// !! NEED A SUCCESS MESSAGE

  const [addStudentToCourse, { error,  }] = useMutation(ADD_STUDENT_TO_COURSE);

    const handleChange = (event) => {
      setUserSelected(event.target.value)
    };


  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { allStudents } = await addStudentToCourse({
        variables: { 
          courseId: course, 
          userId: userSelected },
      });
   
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Add a Student to the Course</h4>
          <div className="card-body">

              <form onSubmit={handleFormSubmit}>
           
              {data && (
                <select 
                className="form-input"
                name="students" 
                id="students-datalist" onChange={(e) => setUserSelected(e.target.value)}>
                
                  {allStudents.map((student) => (
                    <option key={student._id}  value={student._id}>{student.firstName} {student.lastName} </option>
                  ))}
                
                </select>

              )}

                <button
                  className="btn btn-block btn-primary"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddStudentToCourse;
