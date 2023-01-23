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
      token
      user {
        _id
        username
        email
      }
    }
  }
`;


export const UPDATE_PROFILE = gql`
  mutation updateUserProfile($firstName: String, $lastName: String, $email: String, $avatar: String, $password: String, $role: String, $username: String) {
    updateUserProfile(firstName: $firstName, lastName: $lastName, email: $email, avatar: $avatar, password: $password, role: $role, username: $username) {
      username
      firstName
      lastName
      email
      role
    }
  }
`;


export const CREATE_COURSE = gql`
  mutation createCourse($courseTitle: String!, $courseDescription: String!, $teachingAssistant: ID, ) {
    createCourse(courseTitle: $courseTitle, courseDescription: $courseDescription, teachingAssistant: $teachingAssistant) {
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
  }
`;


export const UPDATE_COURSE = gql`
  mutation updateCourse($courseId: ID!, $courseTitle: String, $teachingAssistant: ID, $courseDescription: String) {
    updateCourse(courseId: $courseId, courseTitle: $courseTitle, teachingAssistant: $teachingAssistant, courseDescription: $courseDescription) {
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
  }
`;


export const DELETE_COURSE = gql`
  mutation deleteCourse($courseId: ID!) {
    deleteCourse(courseId: $courseId) {
      _id
    }
  }
`;


export const ADD_STUDENT_TO_COURSE = gql`
  mutation addStudentToCourse($userId: ID!, $courseId: ID!) {
    addStudentToCourse(userId: $userId, courseId: $courseId) {
      _id
      courseTitle
      students {
        _id
        username
      }
    }
  }
`;


export const REMOVE_STUDENT_FROM_COURSE = gql`
  mutation removeStudentFromCourse($userId: ID!, $courseId: ID!) {
    removeStudentFromCourse(userId: $userId, courseId: $courseId) {
      _id
    }
  }
`;
    

export const CREATE_ASSIGNMENT = gql`
  mutation createAssignment($courseId: ID!, $assignmentTitle: String!, $assignmentDescription: String!, $assignmentDueDate: String!) {
    createAssignment(courseId: $courseId, assignmentTitle: $assignmentTitle, assignmentDescription: $assignmentDescription, assignmentDueDate: $assignmentDueDate) {
      _id
      assignmentDescription
      assignmentTitle
      assignmentDueDate
    }
  }
`;
    

export const UPDATE_ASSIGNMENT = gql`
  mutation updateAssignment($assignmentId: ID!, $assignmentTitle: String, $assignmentDescription: String, $assignmentDueDate: String) { 
    updateAssignment(assignmentId: $assignmentId, assignmentTitle: $assignmentTitle, assignmentDescription: $assignmentDescription, assignmentDueDate: $assignmentDueDate) {
      assignmentTitle
      assignmentDescription
      assignmentDueDate
    }
  }
`;


export const REMOVE_ASSIGNMENT = gql`
  mutation removeAssignment($assignmentId: ID!, $courseId: ID!) {
    removeAssignment(assignmentId: $assignmentId, courseId: $courseId) {
      _id
    }
  }
`;


export const ADD_HELP_TICKET = gql`
  mutation addHelpTicket($assignmentId: ID!, $githubRepo: String!, $problemDescription: String!, $topic: String) {
    addHelpTicket(assignmentId: $assignmentId, githubRepo: $githubRepo, problemDescription: $problemDescription, topic: $topic) {
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
  }
`;
   

export const UPDATE_HELP_TICKET = gql`
  mutation updateHelpTicket($helpTicketId: ID!, $topic: String, $githubRepo: String, $problemDescription: String, $ticketStatus: Boolean) {
    updateHelpTicket(helpTicketId: $helpTicketId, topic: $topic, githubRepo: $githubRepo, problemDescription: $problemDescription, ticketStatus: $ticketStatus) {
      _id
      student {
        _id
      }
      problemDescription
      githubRepo
      ticketStatus
      topic
    }
  }
`;


export const CHANGE_PROGRESS_STATUS= gql`
  mutation changeProgressStatus($assignmentId: ID!, $currentStatus: String!, $newStatus: String!) {
    changeAssistanceStatus(assignmentId: $assignmentId, currentStatus: $currentStatus, newStatus: $newStatus) {
      assignmentTitle
    }
  }
`;
   

export const CHANGE_ASSISTANCE_STATUS = gql` 
  mutation changeAssistanceStatus($assignmentId: ID!, $currentStatus: String!, $newStatus: String!) {
    changeProgressStatus(assignmentId: $assignmentId, currentStatus: $currentStatus, newStatus: $newStatus) {
      assignmentTitle
    }
  }
`;


export const ADD_COMMENT = gql` 
  mutation addComment($commentText: String!, $assignmentId: ID, $helpTicketId: ID) {
    addComment(commentText: $commentText, assignmentId: $assignmentId, helpTicketId: $helpTicketId) {
      _id
      commentAuthor
      commentText
      createdAt
      replies {
        _id
        createdAt
        replyAuthor
        replyText
      }
    }
  }
`;

export const REMOVE_COMMENT = gql` 
  mutation removeComment($commentId: ID!, $assignmentId: ID, $helpTicketId: ID) {
    removeComment(commentId: $commentId, assignmentId: $assignmentId, helpTicketId: $helpTicketId) {
      _id
      commentAuthor
      commentText
      createdAt
      replies {
        _id
        createdAt
        replyAuthor
        replyText
      }
    }
  }
`;

export const ADD_REPLY = gql` 
  mutation addReply($commentId: ID!, $replyText: String!) {
    addReply(commentId: $commentId, replyText: $replyText) {
      _id
      commentAuthor
      commentText
      createdAt
      replies {
        _id
        createdAt
        replyAuthor
        replyText
      }
    }
  }
`;

export const REMOVE_REPLY = gql` 
  mutation removeReply($commentId: ID!, $replyId: ID!) {
    removeReply(commentId: $commentId, replyId: $replyId) {
      _id
      commentAuthor
      commentText
      createdAt
      replies {
        _id
        createdAt
        replyAuthor
        replyText
      }
    }
  }
`;