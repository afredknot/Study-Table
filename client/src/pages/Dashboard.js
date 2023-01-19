import React from 'react';
import AssignmentSelector from '../components/AssignmentSelector'
import TicketSelector from "../components/TicketSelector";
import NewsCard from "../components/NewsCard"

import { useProviderContext } from "../utils/providerContext";


const Dashboard = ({ course }) => {

  const { functions } = useProviderContext();

  console.log(functions)

  return (
    <main className="dashboard">
      <AssignmentSelector />
      <TicketSelector />
      <NewsCard />
    </main>
  );
};

export default Dashboard;