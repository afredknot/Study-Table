import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useProviderContext } from "../../utils/providerContext";
import { ADD_HELP_TICKET } from '../../utils/mutations';


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
        case "3":
            setBody(e.target.value);
            break;
    };
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    // SUBMITTED DATA
    console.log(assignment)
    console.log(topic)
    console.log(githubRepo)
    console.log(body)

    try {
      const { data } = await addHelpTicket({
        variables: {
          assignmentId: assignment,
          topic: topic,
          githubRepo: githubRepo,
          problemDescription: body
        },
      });
      // window.location.reload();

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
      <input id="2" value={githubRepo} onChange={handleChange} placeholder="Link to your Repo"></input>
      <textarea id="3" value={body} onChange={handleChange} placeholder="Type your question/request here."></textarea>
      <button type="submit">Submit</button>
    </form>
  );
}

export default CreateHelpTicket;