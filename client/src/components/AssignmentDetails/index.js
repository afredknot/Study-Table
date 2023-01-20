import React from "react";
// import StatusDropdown from "./StatusDropdown"

import { useProviderContext } from "../../utils/providerContext";
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { QUERY_ASSIGNMENT } from '../../utils/queries';


const AssignmentDetails = () => {

    const navigate = useNavigate();
    const { ticket, updateTicket, assignment, updateAssignment } = useProviderContext();
  // const { functions } = useProviderContext();

    const handleTicketSelect =  function(e) {
        // console.log(e.target.id);
            updateAssignment(e.target.id)
            console.log(assignment)
            // setIsMenuOpen(!isMenuOpen);
            navigate('/assignments');
    };

    const { loading, data, error } = useQuery(QUERY_ASSIGNMENT, {
        variables: { assignmentId: assignment },
    });
  console.log(data)
  const assignmentDetails = data?.assignment || {}
  console.log(assignmentDetails)
  // ADD STATUS INDICATIOR

    // Potentially insert chat button in this return
    return (
        
        <div className="card col-4">
            <p>this is the card for the assignment details</p>

            {loading && (
                <p>Loading...</p>
            )}
  
            {data && (                        
                <div className="card1">
                    <h3>Assignment Details</h3>

                    <ul  className="assignmentDetails">
          <li className='assignment'>
          <div onClick={handleTicketSelect}>
              {/* <img src={icon} alt={name} Icon></img> */}
              <h3 id={assignmentDetails._id}>{assignmentDetails.assignmentTitle}</h3>
              <p> {assignmentDetails.assignmentDescription}</p>
              <p> {assignmentDetails.assignmentDueDate}</p>
 
          </div>
          {/* <ClassSelector name={course.courseTitle}/> */}
          </li>
      </ul>
      </div>
      )}
  
                {error && (
                    console.log(error)
                )}

                {/* <h3>{assignmentName}</h3>

                <StatusDropdown />

                <p>{assignmentDueDate}</p>

                <p>{assignmentDescription}</p> */}

            </div>
       
    )
}

export default AssignmentDetails;