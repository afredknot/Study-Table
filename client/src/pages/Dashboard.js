import React from 'react';
import AssignmentSelector from '../components/AssignmentSelector'
import TicketSelector from "../components/TicketSelector";
import NewsCard from "../components/NewsCard"



const Dashboard = ({course}) => {

  return (
    <main className="flex-row justify-center mb-4">
      <AssignmentSelector />
       <TicketSelector/>
       
       <NewsCard />
        

       
    </main>
  );
};

export default Dashboard
