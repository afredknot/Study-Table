import React, { useState, useEffect } from 'react';
import { useProviderContext } from "../../utils/providerContext";
import { useMutation } from '@apollo/client';
import { CHANGE_ASSISTANCE_STATUS, CHANGE_PROGRESS_STATUS } from '../../utils/mutations';


const AssistanceDropdown = (deets) => {

    const [changeAssistanceStatus, { error, data }] = useMutation(CHANGE_ASSISTANCE_STATUS);
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
        sendUpdate()
    }, []);
    
    const handleChange = async (e) => {
        await setStatus(e.target.value);
        
    };
    
    const sendUpdate = async() => {
        
        try {
            const { data } = await changeAssistanceStatus({
                variables: {
                    assignmentId: assignment,
                    currentStatus: myHelpStatus,
                    newStatus: status,
                },
            });
            
        } catch (err) {
            console.error(err);
        }
        
        // checkMyStatus();
        // window.location.reload()
        
        }



  // REMOVE INLINE STYLE ONCE CSS IS ADDED
  return (
    <div>

        <h4>My status: {display}</h4>

      <select  defaultValue={myHelpStatus} id ="statusSelector" onChange={handleChange} >
        <option value="studentDefaultStatus" style={{ color: "red" }}>I'm currently working on this independently</option>
        <option value="requestingHelp" style={{ color: "orange" }}>I'd like some assistance</option>
        <option value="offeringAssistance" style={{ color: "green" }}>Happy to help others</option>
      </select> 

    {/* <div>
        <input onChange={handleChange} type="radio" id="studentDefaultStatus" name="drone" value="studentDefaultStatus" checked />
        <label for="studentDefaultStatus">I'm currently working on this independently</label>
    </div>

    <div>
      <input onChange={handleChange} type="radio" id="requestingHelp" name="drone" value="requestingHelp"/>
      <label for="requestingHelp">I'd like some assistance</label>
    </div>

    <div>
      <input onChange={handleChange} type="radio" id="offeringAssistance" name="drone" value="offeringAssistance"/>
      <label for="offeringAssistance">Happy to help others</label>
    </div> */}



    </div>
  );
}

export default AssistanceDropdown;