const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type User {
    _id: ID!
    username: String!
    firstName: String!
    lastName: String!
    avatar: String
    role: String
    email: String!
    password: String
    courses: [Course]
  }

  type Course {
    _id: ID
    courseTitle: String
    instructor: User
    teachingAssistant: [User]
    assignments: [Assignment]
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
    offeringAssistance: [User]
    createdAt: String
  }

  type HelpTicket {
    _id: ID!
    student: User!
    topic: String
    githubRepo: String!
    problemDescription: String!
    ticketStatus: Boolean!
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    courses: [Course]
    course(courseTitle: String!): Course
    assignments: [Assignment]
    assignment(assignmentTitle: String!): Assignment
    me: User
  }

  # ------------------------------------------------------------------------------------------

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth



    # addThought(thoughtText: String!): Thought
    # addComment(thoughtId: ID!, commentText: String!): Thought
    # removeThought(thoughtId: ID!): Thought
    # removeComment(thoughtId: ID!, commentId: ID!): Thought


    createCourse(courseTitle:String!, courseDescription:String!, instructor:String!, teachingAssistant: String): Course
    
    addStudentToCourse(userId: ID!, courseId: ID!): User
    removeStudentFromCourse(userId: ID!, courseId: ID!): User
    
    createAssignment(courseId: ID!, course:String!, assignmentTitle: String!, assignmentDescription: String!, assignmentDueDate: String!): Assignment

    updateAssignment(assignmentId: ID!, assignmentTitle: String!, assignmentDescription: String!, assignmentDueDate: String!): Assignment

    # removeAssignment

    # addTeachingAssistant
    # updateTeachingAssistant
    # removeTeachingAssistant

    # updateInstructor
    # removeInstructor

    # updateAssignmentStatus
    addHelpTicket(student: ID!, githubRepo: String!, problemDescription: String!, ticketStatus: Boolean!)






    
  }

  # ------------------------------------------------------------------------------------------

`;

module.exports = typeDefs;
