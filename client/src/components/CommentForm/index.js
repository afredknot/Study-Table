import React, { useState } from 'react';
import { useProviderContext } from "../../utils/providerContext";
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { ADD_COMMENT } from '../../utils/mutations';
import "./style.css";

const CommentForm = () => {

  const { ticket, updateTicket, assignment, updateAssignment, comment, updateComment } = useProviderContext();
  const [addComment, { error, data }] = useMutation(ADD_COMMENT);

  const [newComment, setComment] = useState("");
  const [buttonDisplay, setButtonDisplay] = useState(false);

  const handleChange = (e) => {
    setComment(e.target.value);

    if (e.target.value.length > 0) {
      setButtonDisplay(true);
    } else {
      setButtonDisplay(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addComment({
        variables: {
          commentText: newComment,

          // !! This should only be one or the other?

          assignmentId: assignment,
          // helpTicketId: ticket
        },
      });

    } catch (e) {
      console.error(e);
    }

    setComment("");
    setButtonDisplay(false)
    
    // MUTATE HERE WITH VALUE OF comment AS BODY
  }

  const toggleButtons = () => {
    setButtonDisplay(!buttonDisplay);
    setComment("");
  }

  return (
    <form className="commentForm" onSubmit={handleSubmit}>
      <input className="commentInput" value={newComment} onChange={handleChange} placeholder="Add a comment..."></input>
      <div className="commentButtons" style={{ visibility: `${buttonDisplay ? "visible" : "hidden"}`, opacity: `${buttonDisplay ? "100%" : "0%"}`}}>
        <button type="submit">Submit</button>
        <button onClick={toggleButtons} type="reset">Cancel</button>
      </div>
    </form>
  );
}

export default CommentForm;