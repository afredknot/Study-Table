const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type User {
    _id: ID!
    username: String
    firstName: String
    lastName: String
    avatar: String
    role: String
    email: String
    password: String
    courses: [Course]
  }

  type Course {
    _id: ID
    courseTitle: String
    courseDescription: String
    instructor: User
    teachingAssistant: User
    assignments: [Assignment]
    students: [User]
    createdAt: String
  }

  type Assignment {
    _id: ID
    assignmentTitle: String
    assignmentDescription: String
    assignmentDueDate: String
    studentProgressNotStarted: [User]
    studentProgressWorking: [User]
    studentProgressCompleted: [User]
    studentDefaultStatus: [User]
    requestingHelp: [User]
    helpTickets: [HelpTicket]
    offeringAssistance: [User]
    comments: [Comment]
    createdAt: String
  }

  type HelpTicket {
    _id: ID
    student: User
    topic: String
    githubRepo: String
    problemDescription: String
    ticketStatus: Boolean
    comments: [Comment]
    createdAt: String
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
    replies: [Reply]
  }

  type Reply {
    _id: ID
    replyText: String
    replyAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    students: [User]
    users: [User]
    user(_id: ID!): User
    courses: [Course]
    course(courseId: ID!): Course
    assignments: [Assignment]
    assignment(assignmentId: ID!): Assignment
    me: User
    helpTickets: [HelpTicket]
    helpTicket(_id: ID!): HelpTicket
  }

  # ------------------------------------------------------------------------------------------

  type Mutation {
    addUser(username: String!, role: String!, firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    updateUserProfile( role: String, username: String,firstName: String, lastName: String, email: String, avatar: String, password: String): User

    createCourse(courseTitle:String!, courseDescription:String!, teachingAssistant: ID): Course
    updateCourse(courseId: ID!, courseTitle:String, courseDescription:String, teachingAssistant: ID): Course
    deleteCourse(courseId: ID!): Course

    addStudentToCourse(userId: ID!, courseId: ID!): Course
    removeStudentFromCourse(userId: ID!, courseId: ID!): User
    
    createAssignment(courseId: ID!, assignmentTitle: String!, assignmentDescription: String!, assignmentDueDate: String!): Assignment
    updateAssignment(assignmentId: ID!, assignmentTitle: String, assignmentDescription: String, assignmentDueDate: String): Assignment
    removeAssignment(assignmentId: ID!, courseId: ID!): Assignment

    addHelpTicket(assignmentId: ID!, topic: String, githubRepo: String!, problemDescription: String!): HelpTicket
    updateHelpTicket(helpTicketId: ID!, topic: String, githubRepo: String, problemDescription: String, ticketStatus: Boolean): HelpTicket

    changeProgressStatus(assignmentId: ID!, currentStatus: String!, newStatus: String!): Assignment
    
    changeAssistanceStatus(assignmentId: ID!, currentStatus: String!, newStatus: String!): Assignment

# -------------------------------------------------------------------------------

    addComment(commentText: String!, assignmentId:ID helpTicketId: ID ): Comment
    removeComment(commentId: ID!, assignmentId:ID helpTicketId: ID ): Comment

    addReply(commentId: ID!, replyText: String!): Comment
    removeReply(commentId: ID!, replyId: ID!): Comment

   # ------------------------------------------------------------------------------------------   

  }
`;




module.exports = typeDefs;
