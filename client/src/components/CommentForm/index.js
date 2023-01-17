import React, { useState } from 'react';

const CommentForm = () => {
  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // MUTATE HERE WITH VALUE OF comment AS BODY
    setComment("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={comment} onChange={handleChange} placeholder="Enter your comment here"></textarea>
      <button type="submit">Submit</button>
    </form>
  );
}

export default CommentForm;