import React, { useState } from 'react';
import AssignmentView from "./AssignmentView";
import TicketView from "./TicketView";
import DefaultView from "./DefaultView";

const [dashState, setDashState] = useState("Default");
const [selectedElement, setSelected] = useState("");
 
function handleAssignmentSelect(e) {
  setSelected(querySelected(e.target.key));
  setDashState("Assignment");
};

function handleTicketSelect() {
  setDashState("Ticket");
};

function querySelected(target) {
  db
}

function pageRender(course) {
  switch(dashState) {
    case "Assignment":
      return <AssignmentView course={course} handleAssignmentSelect={handleAssignmentSelect} />
    case "Ticket":
      return <TicketView course={course} handleAssignmentSelect={handleAssignmentSelect} handleTicketSelect={handleTicketSelect} />
    default:
      return <DefaultView course={course} handleAssignmentSelect={handleAssignmentSelect} handleTicketSelect={handleTicketSelect} />
  }
};

const Dashboard = ({course}) => {

  return (
    <main>
        {pageRender(course)}
    </main>
  );
};

export default Dashboard;
