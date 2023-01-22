import React, { useState, useEffect } from 'react';
import { useProviderContext } from "../../utils/providerContext";
import { useMutation } from '@apollo/client';
import { CHANGE_PROGRESS_STATUS } from '../../utils/mutations';

const AssistanceDropdown = (deets) => {

    const [changeProgressStatus, { error, data }] = useMutation(CHANGE_PROGRESS_STATUS);
    const { user, ticket, updateTicket, assignment, updateAssignment, comment, updateComment } = useProviderContext();
    
    const assignmentDetails = deets.deets

    const [myHelpStatus, setMyHelpStatus] = useState(`I'm currently working on this independently`);

    const [display, setDisplay] = useState(`I'm currently working on this independently`);
    
    const checkMyStatus = async () => {

        // console.log(assignmentDetails)

        await assignmentDetails.studentDefaultStatus.forEach(student => {
            // console.log('first')
            if (student._id === user){
                // console.log('match')
                setMyHelpStatus(`studentDefaultStatus`)
                setDisplay(`I'm currently working independently`)
            }         
        });
        
        await assignmentDetails.requestingHelp.forEach(student => {
            // console.log('second')
            if (student._id === user){
                setMyHelpStatus(`requestingHelp`)
                setDisplay(`I'd like some help with this assignment`)
            }         
        });

        await assignmentDetails.offeringAssistance.forEach(student => {
            console.log('third')
            if (student._id === user){
                console.log('here i am')
                setMyHelpStatus(`offeringAssistance`)
                setDisplay(`Happy to help others`)
            }         
        })
    }
    
    const [status, setStatus] = useState('');
    
    useEffect(() => {
    checkMyStatus(assignmentDetails);
    }, [assignmentDetails, status]);

    const handleChange = async (e) => {
      await setStatus(e.target.value);
      await console.log(status) 
      console.log(myHelpStatus)
    //   console.log(assignment)

    // e.preventDefault();

    try {
        const { data } = await changeProgressStatus({
        variables: {
            assignmentId: assignment,
            currentStatus: myHelpStatus,
            newStatus: status,
        },
        });

    } catch (err) {
        console.error(err);
    }

    };


  // REMOVE INLINE STYLE ONCE CSS IS ADDED
  return (
    <div>

        <h4>My status: {display}</h4>

      <select value={status} onChange={handleChange}>
        <option value="studentDefaultStatus" style={{ color: "red" }}>I'm currently working on this independently</option>
        <option value="requestingHelp" style={{ color: "orange" }}>I'd like some assistance</option>
        <option value="offeringAssistance" style={{ color: "green" }}>Happy to help others</option>
      </select>
    </div>
  );
}

export default AssistanceDropdown;