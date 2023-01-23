import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useProviderContext } from "../../utils/providerContext";
import { ADD_HELP_TICKET } from '../../utils/mutations';
import "./style.css";

const CreateHelpTicket = ({assignmentId, user}) => {

  const { course, updateCourse, assignment } = useProviderContext();

  const [topic, setSubject] = useState("");
  const [githubRepo, setRepo] = useState("");
  const [body, setBody] = useState("");

  const [addHelpTicket, { error, data }] = useMutation(ADD_HELP_TICKET);

  const handleChange = (e) => {
    switch(e.target.id) {
        case "1":
            setSubject(e.target.value);
            break;
        case "2":
            setRepo(e.target.value);
            break;
        case "problemDescription":
            setBody(e.target.value);
            break;
    };
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    // SUBMITTED DATA
    // console.log(assignment)
    // console.log(topic)
    // console.log(githubRepo)
    // console.log(body)

    try {
      const { data } = await addHelpTicket({
        variables: {
          assignmentId: assignment,
          topic: topic,
          githubRepo: githubRepo,
          problemDescription: body
        },
      });
      window.location.reload();

    } catch (e) {
      console.error(e);

    }

    

    // MUTATE HERE
    setSubject("");
    setRepo("");
    setBody("");
    // send success message and return to ???
  };

  return (
    <div className='selectors no-scroll'>
      <div className="cardHeader">
        <h3>Ask for Assistance</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <input id="1" className="form-input" value={topic} onChange={handleChange} placeholder="Subject"></input>
        <input id="2" className="form-input" value={githubRepo} onChange={handleChange} placeholder="Link to your repository"></input>
        <textarea id="problemDescription" className="form-input" value={body} onChange={handleChange} placeholder="Provide a description of the issue you would like help with"></textarea>
        <button className="btn btn-block btn-primary" style={{ cursor: 'pointer' }} type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateHelpTicket;