import React, { useState } from 'react';
import { useProviderContext } from "../../utils/providerContext";
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { ADD_COMMENT } from '../../utils/mutations';

const CommentForm = () => {

  const navigate = useNavigate();
  const { ticket, updateTicket, assignment, updateAssignment, comment, updateComment } = useProviderContext();
  const [addComment, { error, data }] = useMutation(ADD_COMMENT);

  const [newComment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addComment({
        variables: { 
          commentText: newComment,
          
          // !! This should only be one or the other?
          
          assignmentId: assignment,
          helpTicketId: ticket
        },
      });

    } catch (e) {
      console.error(e);
    }
    

    // MUTATE HERE WITH VALUE OF comment AS BODY
    setComment("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={newComment} onChange={handleChange} placeholder="Enter your comment here"></textarea>
      <button type="submit">Submit</button>
    </form>
  );
}

export default CommentForm;