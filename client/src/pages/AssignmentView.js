import React from 'react';
import AssignmentSelector from '../components/AssignmentSelector'
import AssignmentDetails from "../components/AssignmentDetails";




const AssignmentView = ({course}) => {

  return (
    <main className="flex-row justify-center mb-4">
      <AssignmentSelector />
       <AssignmentDetails/>
       
       
        

       
    </main>
  );
};

export default AssignmentView
