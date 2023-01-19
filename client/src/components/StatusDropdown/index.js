import React, { useState } from 'react';

const StatusDropdown = () => {
  const [status, setStatus] = useState("Not Started");

  const handleChange = (e) => {
    setStatus(e.target.value);
    // POTENTIAL MUTATION TO ASSIGNMENT STATUS ON DB?
    changeStatus(user, assignment, status);
  }

  // REMOVE INLINE STYLE ONCE CSS IS ADDED
  return (
    <div>
      <select value={status} onChange={handleChange}>
        <option value="Not Started" style={{ color: "red" }}>Not Started</option>
        <option value="In Progress" style={{ color: "orange" }}>In Progress</option>
        <option value="Completed" style={{ color: "green" }}>Completed</option>
      </select>
    </div>
  );
}

export default StatusDropdown;