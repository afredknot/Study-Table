import React, { useState } from 'react';

const HelpTicket = ({assignment, user}) => {
  const [subject, setSubject] = useState("");
  const [repo, setRepo] = useState("");
  const [body, setBody] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // SUBMITTED DATA
    // {
    //     author: user,
    //     assignment: assignment,
    //     subject: subject,
    //     repo: repo,
    //     body: body
    // }
    // MUTATE HERE
    setSubject("");
    setRepo("");
    setBody("");
    // send success message and return to ???
  };

  return (
    <form onSubmit={handleSubmit}>
      <input id="1" value={subject} onChange={handleChange} placeholder="Subject"></input>
      <input id="2" value={repo} onChange={handleChange} placeholder="Link to your Repo"></input>
      <textarea id="3" value={body} onChange={handleChange} placeholder="Type your question/request here."></textarea>
      <button type="submit">Submit</button>
    </form>
  );
}

export default HelpTicket;