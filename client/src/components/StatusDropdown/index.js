import React, { useState } from 'react';
import { useProviderContext } from "../../utils/providerContext";
import { useMutation } from '@apollo/client';
import { CHANGE_PROGRESS_STATUS } from '../../utils/mutations';

const StatusDropdown = () => {

    const [changeProgressStatus, { error, data }] = useMutation(CHANGE_PROGRESS_STATUS);
    const { ticket, updateTicket, assignment, updateAssignment, comment, updateComment } = useProviderContext();

    const [status, setStatus] = useState("studentProgressNotStarted");
  
    const currentTestStatus = status

    // console.log(currentTestStatus)


    const handleChange = (e) => {
      console.log(e.target.value);
      setStatus(e.target.value);
      // POTENTIAL MUTATION TO ASSIGNMENT STATUS ON DB?
      // changeStatus(user, assignment, status);
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(currentTestStatus)
        try {
            const { data } = await changeProgressStatus({
            variables: {
                assignmentId: assignment,

                // !! Need to query current status??

                currentProgressStatus: currentTestStatus,
                newProgressStatus: status,
            },
            });

        } catch (err) {
            console.error(err);
        }
    };


  // REMOVE INLINE STYLE ONCE CSS IS ADDED
  return (
    <div>
      <select value={status} onChange={handleChange}>
        <option value="studentProgressNotStarted" style={{ color: "red" }}>Not Started</option>
        <option value="studentProgressWorking" style={{ color: "orange" }}>In Progress</option>
        <option value="studentProgressCompleted" style={{ color: "green" }}>Completed</option>
      </select>
    </div>
  );
}

export default StatusDropdown;