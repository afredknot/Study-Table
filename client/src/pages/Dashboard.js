import React from 'react';
import AssignmentSelector from '../components/AssignmentSelector'
import TicketSelector from "../components/TicketSelector";
import NewsCard from "../components/NewsCard"

import { useProviderContext } from "../utils/providerContext";
import { QUERY_ME, QUERY_ASSIGNMENT, QUERY_COURSE } from '../utils/queries';
import { ADD_HELP_TICKET, CREATE_ASSIGNMENT, CREATE_COURSE } from '../utils/mutations';


const Dashboard = ({ course }) => {

  const { functions } = useProviderContext();

//  console.log(functions.useAQuery(QUERY_ME))
//  console.log(functions.useAQuery(QUERY_ASSIGNMENT, {
//           variables: { assignmentId: "63c8a1e1003d5a5cd2a758a4" },
//       }))
      // console.log(functions.useAQuery(QUERY_COURSE, {
      //     variables: { courseId: "63c886cff478fa1240f011bb" },
      // }))

      // ! I can't get mutations to run with this setup 
  // console.log(functions.useAMutation(ADD_HELP_TICKET, {
  //       variables: { 
  //         assignmentId: "63c8a1e1003d5a5cd2a758a4", 
  //         githubRepo: "github.com/mfrabott", 
  //         topic: "this is hard",
  //         problemDescription: "like, really hard"
  //      }
  //   }))
  // console.log(functions.useAMutation(CREATE_COURSE, {
  //    variables: { 
  //       courseTitle: "Title", 
  //       courseDescription: "Description", 
  //     }
  //   }))
    // console.log(functions.useAMutation(CREATE_ASSIGNMENT, {
    //   variables: { 
    //      courseId: "63c886cff478fa1240f011bb", 
    //      assignmentTitle: "Title",
    //      assignmentDescription: "Description",
    //      assignmentDueDate: "01-24-2023" 
    //    }
    //  }))
    // !!This Works But repeatedly fires, so comment out after a quick run
    // console.log(functions.CreateComment())


  return (
    <main className="dashboard">
      <AssignmentSelector />
      <TicketSelector />
      <NewsCard />
    </main>
  );
};

export default Dashboard;