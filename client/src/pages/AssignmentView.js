import React from 'react';
import AssignmentSelector from '../components/AssignmentSelector'
import AssignmentDetails from "../components/AssignmentDetails";
import HelpTicket from "../components/HelpTicket"
import TicketSelector from "../components/TicketSelector"


const AssignmentView = ({course}) => {

  return (
    <main className="flex-row justify-center mb-4">
      <AssignmentSelector />
       <AssignmentDetails />
       {/* <TicketSelector /> */}
       <HelpTicket />
       
        

       
    </main>
  );
};

export default AssignmentView
