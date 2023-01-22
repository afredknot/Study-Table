import React from 'react';
import AddStudentToCourse from '../InstructorMenu/AddStudentToCourse';
import CreateAssignment from '../InstructorMenu/CreateAssignment';
import CreateCourse from '../InstructorMenu/CreateCourse';

const InstructorDashboard = ({  }) => {

  return (
    <main className="instructorDashBoard">
      <CreateAssignment />
      <AddStudentToCourse />
      <CreateCourse />
    </main>
  );
};

export default InstructorDashboard;