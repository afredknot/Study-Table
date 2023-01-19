import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { CREATE_COURSE } from '../utils/mutations';

import Auth from '../utils/auth';

const CreateCourse = () => {
  const [formState, setFormState] = useState({
    courseTitle: '',
    courseDescription: '',
    teachingAssistant: '',
  });
  const [createCourse, { error, data }] = useMutation(CREATE_COURSE);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

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
            {data ? (
              <p>
                Success! You have added a new course.
                {/* <Link to="/">back to the homepage.</Link> */}
              </p>
            ) : (
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
               <input
                  className="form-input"
                  placeholder="Teaching Assistant"
                  name="teachingAssistant"
                  type="text"
                  value={formState.teachingAssistant}
                  onChange={handleChange}
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

export default CreateCourse;
