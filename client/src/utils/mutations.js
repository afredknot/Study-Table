import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $role: String!, $firstName: String!, $lastName: String!, $email: String!, $password: String!) {
  addUser(username: $username, role: $role, firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
    user {
      username
      role
      password
      firstName
      lastName
      email
    }
  }
}
`;


// export const ADD_COMMENT = gql`
//   mutation addComment($thoughtId: ID!, $commentText: String!) {
//     addComment(thoughtId: $thoughtId, commentText: $commentText) {
//       _id
//       thoughtText
//       thoughtAuthor
//       createdAt
//       comments {
//         _id
//         commentText
//         createdAt
//       }
//     }
//   }
// `;

export const UPDATE_PROFILE = gql`
mutation updateUserProfile(firstName: $firstName, lastName: $lastName, email: $email, avatar: $avatar, password: $password, role: $role, username: $username) {
    username
    firstName
    lastName
    email
    role
  }
`;

export const CREATE_COURSE = gql`
  mutation createCourse(courseTitle: $courseTitle, courseDescription: $courseDescription, teachingAssistant: $teachingAssistant) {
    _id
    courseTitle
    courseDescription
    instructor {
      _id
      username
    }
    teachingAssistant {
      _id
      username
    }
  }
`;

export const UPDATE_COURSE = gql`
  mutation updateCourse(courseId: $courseId, courseTitle: $courseTitle, teachingAssistant: $teachingAssistant, courseDescription: $courseDescription) {
    _id
    courseTitle
    courseDescription
    instructor {
      _id
      username
    }
    teachingAssistant {
      _id
      username
    }
  }
`;

export const DELETE_COURSE = gql`
  mutation deleteCourse(courseId: $courseId) {
    _id
  }
`;

export const ADD_STUDENT_TO_COURSE = gql`
  mutation addStudentToCourse(userId: $userId, courseId: $courseId) {
    _id
    courseTitle
    students {
      _id
      username
    }
  }
`;

export const REMOVE_STUDENT_FROM_COURSE = gql`
  mutation removeStudentFromCourse(userId: $userId, courseId: $courseId){
    _id
    username
    courses {
      _id
      courseTitle
    }
  }
`;
    
export const CREATE_ASSIGNMENT = gql`
  mutation createAssignment(courseId: $courseId, assignmentTitle: $assignmentTitle, assignmentDescription: $assignmentDescription, assignmentDueDate: $assignmentDueDate) {
    _id
    assignmentDescription
    assignmentTitle
    assignmentDueDate
  }
`;
    
export const UPDATE_ASSIGNMENT = gql`
  mutation updateAssignment(assignmentId: $assignmentId, assignmentTitle: $assignmentTitle, assignmentDescription: $assignmentDescription, assignmentDueDate: $assignmentDueDate) {
    _id
    assignmentTitle
    assignmentDescription
    assignmentDueDate
  }
`;

export const REMOVE_ASSIGNMENT = gql`
mutation removeAssignment(assignmentId: $assignmentId, courseId: $courseId) {
    _id
  }
`;

export const ADD_HELP_TICKET = gql`
mutation addHelpTicket(assignmentId: $assignmentId, githubRepo: $githubRepo, problemDescription: $problemDescription, topic: $topic) {
    _id
    student {
      _id
    }
    topic
    githubRepo
    problemDescription
    ticketStatus
    createdAt
  }
`;
   
export const UPDATE_HELP_TICKET = gql`
  mutation updateHelpTicket(helpTicketId: $helpTicketId, topic: $topic, githubRepo: $githubRepo, problemDescription: $problemDescription, ticketStatus: $ticketStatus) {
    _id
    student {
      _id
    }
    problemDescription
    githubRepo
    ticketStatus
    topic
  }
`;

export const CHANGE_PROGRESS_STATUS= gql`
mutation changeProgressStatus(assignmentId: $assignmentId, currentStatus: $currentStatus, newStatus: $newStatus) {
    _id
    assignmentTitle
    studentProgressNotStarted {
      _id
    }
    studentProgressWorking {
      _id
    }
    studentProgressCompleted {
      _id
    }
  }
`;
   
export const CHANGE_ASSISTANCE_STATUS = gql` 
mutation changeAssistanceStatus(assignmentId: $assignmentId, currentStatus: $currentStatus, newStatus: $newStatus) {
    _id
    assignmentTitle
    studentDefaultStatus {
      _id
    }
    requestingHelp {
      _id
    }
    offeringAssistance {
      _id
    }
  }
`;
