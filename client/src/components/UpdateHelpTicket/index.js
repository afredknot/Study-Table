import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { UPDATE_HELP_TICKET } from '../../utils/mutations';

i
const UpdateHelpTicket = ({assignmentId}) => {
  const [topic, setSubject] = useState("");
  const [repo, setRepo] = useState("");
  const [body, setBody] = useState("");

  const [updateHelpTicket, { error, data }] = useMutation(UPDATE_HELP_TICKET);

  const handleChange = (e) => {
    switch(e.target.id) {
        case "1":
            setSubject(e.target.value);
            break;
        case "2":
            setRepo(e.target.value);
            break;
        case "3":
            setBody(e.target.value);
            break;
    };
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    // SUBMITTED DATA
    try {
      const { data } = await updateHelpTicket({
        variables: {
          assignmentId: assignment,
          topic: subject,
          githubRpo: repo,
          problemDescription: body
        },
      });

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
    <form onSubmit={handleSubmit}>
      <input id="1" value={topic} onChange={handleChange} placeholder="Subject"></input>
      <input id="2" value={gitHubRepo} onChange={handleChange} placeholder="Link to your Repo"></input>
      <textarea id="3" value={body} onChange={handleChange} placeholder="Type your question/request here."></textarea>
      <button type="submit">Submit</button>
    </form>
  );
}

export default UpdateHelpTicket;