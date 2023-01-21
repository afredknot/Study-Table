import React from "react";
import "./style.css"

import { useProviderContext } from "../../utils/providerContext";
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { QUERY_COURSE } from '../../utils/queries';

const TicketSelector = () => {


  const navigate = useNavigate();
  const { course, ticket, updateTicket } = useProviderContext();
// const { functions } = useProviderContext();

  const handleTicketSelect =  function(e) {
      // console.log(e.target.id);
          updateTicket(e.target.id)
          console.log(ticket)
          // setIsMenuOpen(!isMenuOpen);
          navigate('/tickets');
  };

  const { loading, data, error } = useQuery(QUERY_COURSE, {
    variables: { courseId: course },
  });
  // console.log(data)
  const assignmentList = data?.course.assignments || {}
  // console.log(assignmentList)
  // console.log(assignmentList[0].helpTickets[0]._id)

    return (
      
      
        <div className ="selectors">


        {loading && (
          <p>Loading...</p>
        )}

          <h3>Open Tickets</h3>

            {data && (

              <ul>
                {assignmentList.map((assignment) => {
                  return assignment.helpTickets.map((helpTicket) => (
                    <li key= {helpTicket._id}  onClick={handleTicketSelect}>
                      <h4 id= {helpTicket._id} className="associatedAssignment">{assignment.assignmentTitle}</h4>
                      <p className="tagAuth">{helpTicket.student.username}</p>
                      <p className="tagAssi">{helpTicket.topic}</p>
                      <p className="tagAssi">{helpTicket.problemDescription}</p>
                      <p className="tagDur">{helpTicket.createdAt}</p>
                    </li>
                ))}
                )}
              </ul>

           )}


          {error && (
            console.log(error)
          )}

        </div>
        
    )
}

export default TicketSelector;