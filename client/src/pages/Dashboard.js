
import React, { useState, useEffect } from 'react';
import AssignmentSelector from '../components/AssignmentSelector'
import TicketSelector from "../components/TicketSelector";
import NewsCard from "../components/NewsCard"
import AddStudentToCourse from '../components/InstructorMenu/AddStudentToCourse';
import CreateAssignment from '../components/InstructorMenu/CreateAssignment';
import CreateCourse from '../components/InstructorMenu/CreateCourse';
import InstructorDashboard from '../components/InstructorDashboard';

import { useProviderContext } from "../utils/providerContext";
import Students from '../components/InstructorMenu/Students';

const Dashboard = ({ }) => {

  const { myRole, course, updateCourseTitle, courseTitle } = useProviderContext();
  // let courseName = courseTitle
  const [displayTitle, updateDisplayTitle] = useState(courseTitle)
// const displayTitle = courseName

  // useEffect(() => {
  //   updateDisplayTitle(courseTitle)
  // }, [course]
  // )

  return (
    <main className="dashboard">
      {/* <h2>{courseTitle}</h2> */}
      <AssignmentSelector />
      <TicketSelector />
      <NewsCard />
      {myRole === 'instructor' ? ( 
        <>
        <InstructorDashboard />
        <Students />
        </>
      ) : <></>
      }
    </main>
  );
};

export default Dashboard;