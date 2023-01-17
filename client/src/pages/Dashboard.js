import React from 'react';
import AssignmentSelector from "../components/AssignmentSelector"

function handleAssignmentSelect() {


}


const Dashboard = (selectedClass) => {

  return (
    <main>
      <div className="">
        <AssignmentSelector handleAssignmentSelect={handleAssignmentSelect} assignments={selectedClass.assignments} />
        
      </div>
    </main>
  );
};

export default Dashboard;
