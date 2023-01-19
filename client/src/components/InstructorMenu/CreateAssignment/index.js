import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { CREATE_ASSIGNMENT } from '../utils/mutations';

import Auth from '../utils/auth';

const CreateAssignment = () => {
  const [formState, setFormState] = useState({
    assignmentTitle: '',
    assignmentDescription: '',
    assignmentDueDate: '',
  });
  const [createAssignment, { error, data }] = useMutation(CREATE_ASSIGNMENT);

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
      const { data } = await createAssignment({
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
          <h4 className="card-header bg-dark text-light p-2">Add an Assignment</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You have added a new assignment.
                {/* <Link to="/">back to the homepage.</Link> */}
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Assignment Name"
                  name="assignmentTitle"
                  type="text"
                  value={formState.assignmentTitle}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Assignment Description"
                  name="assignmentDescription"
                  type="text"
                  value={formState.assignmentDescription}
                  onChange={handleChange}
                />
               <input
                  className="form-input"
                  placeholder="Due Date"
                  name="assignmentDueDate"
                  
                  // ! Validate / date type? 

                  type="text"
                  value={formState.assignmentDueDate}
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

export default CreateAssignment;
