import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation, useQuery } from '@apollo/client';
import { ADD_STUDENT_TO_COURSE } from '../utils/mutations';
import { QUERY_USERS } from '../../../utils/mutations';


const AddStudentToCourse = (courseId) => {

  const [userSelected, setUserSelected] = useState();

  const [users] = useQuery(QUERY_USERS);


  // query all users and get back id and first and last name
     // const results = users()

  //take results and make objects with     <option value="Student Name">
  // get studentid from name selected
  // setUserSelected(studentId)
  

  const [addStudentToCourse, { error, data }] = useMutation(ADD_STUDENT_TO_COURSE);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserSelected({
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { allStudents } = await addStudentToCourse({
        variables: { 
          courseId, 
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
            {data ? (
              <p>
                Success! You have added a new student to the course.
                {/* <Link to="/">back to the homepage.</Link> */}
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input 
                  list="students"
                  name="students"
                  placeholder="Student"
                  className="dropdown-input"
                  />
                  <datalist id="students"

        // TODO
                  {...options}
                  
                  />
                <button
                  className="btn btn-block btn-primary"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

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
