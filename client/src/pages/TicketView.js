import React from 'react';
import AssignmentSelector from '../components/AssignmentSelector'
import TicketSelector from "../components/TicketSelector";
import TicketDetails from "../components/TicketDetails"



function TicketView () {

  return (
    <main className="flex-row justify-center mb-4">
      <AssignmentSelector />
       <TicketSelector/>
       
       <TicketDetails />
        

       
    </main>
  );
};

export default TicketView
