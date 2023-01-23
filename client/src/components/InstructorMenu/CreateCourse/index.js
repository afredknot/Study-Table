import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation, useQuery } from '@apollo/client';
import { CREATE_COURSE } from '../../../utils/mutations';
import { QUERY_INSTRUCTORS } from '../../../utils/queries';

const CreateCourse = () => {

  const [asssistantSelected, setAssistantSelected] = useState();

  const { data} = useQuery(QUERY_INSTRUCTORS);

  const allInstructors = data?.instructors || [];

  const [formState, setFormState] = useState({
    courseTitle: '',
    courseDescription: '',
    teachingAssistant: asssistantSelected,
  });

  // !! NEED A SUCCESS MESSAGE
  const [createCourse, { error }] = useMutation(CREATE_COURSE);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createCourse({
        variables: { ...formState },
      });

    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Create a Course</h4>
          <div className="card-body">

              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Course Name"
                  name="courseTitle"
                  type="text"
                  value={formState.courseTitle}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Course Description"
                  name="courseDescription"
                  type="text"
                  value={formState.courseDescription}
                  onChange={handleChange}
                />
                <h4 className="card-header bg-dark text-light p-2">Choose a TA</h4>
                {data && (
                  <select 
                  className="form-input"
                  name="instructors" 
                  id="instructor-datalist" 
                  onChange={(e) => setAssistantSelected(e.target.value)}>
                  
                    {allInstructors.map((instructor) => (
                      <option 
                      key={instructor._id}  
                      value={instructor._id}>{instructor.firstName} {instructor.lastName} 
                        </option>
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

export default CreateCourse;
