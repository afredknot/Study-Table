import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    firstName: '',
    lastName: '',
    role: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);
  const {role, setRole} = useState("")
  
   const handleChange = (event) => {
    const { name, value, setRole} = event.target; 
    
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
        
      });
      // const token = data.data.addUser.token;
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
      
    }
  };

  return (
    <main className="flex-row justify-center mt-4" >
      <div className="col-12 col-lg-6 rounded">
        <div className="card rounded-bottom">
          <h4 className="card-header bg-dark text-center text-light p-2 rounded">Sign Up</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/dashboard">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input text-center"
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={formState.username}
                  onChange={handleChange}
                />
                <input
                  className="form-input text-center"
                  placeholder="Your first name"
                  name="firstName"
                  type="text"
                  value={formState.firstName}
                  onChange={handleChange}
                />
               <input
                  className="form-input text-center"
                  placeholder="Your last name"
                  name="lastName"
                  type="text"
                  value={formState.lastName}
                  onChange={handleChange}
                />
                <select
                className="form-input text-center"
                placeholder="Whats your Role"
                name="role"
                type="text"
                value={ role }
                onChange={handleChange}
                >
                  <option value="empty">Select a Role</option>
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
                </select>

                <input
                  className="form-input text-center"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input text-center"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
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

export default Signup;
