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
    addUser(username: String!, role: String!, firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    updateUserProfile(userId: ID!, role: String, firstName: String, lastName: String, email: String, avatar: String, password: String): User



    createCourse(courseTitle:String!, courseDescription:String!, instructor:ID!, teachingAssistant: String): Course
    updateCourse(courseId: ID!, courseTitle:String, courseDescription:String, teachingAssistant: ID): Course
    deleteCourse(courseId: ID!): Course


    addStudentToCourse(userId: ID!, courseId: ID!): Course
    removeStudentFromCourse(userId: ID!, courseId: ID!): User
    
    createAssignment(courseId: ID!, assignmentTitle: String!, assignmentDescription: String!, assignmentDueDate: String!): Assignment
    updateAssignment(assignmentId: ID!, assignmentTitle: String, assignmentDescription: String, assignmentDueDate: String): Assignment
    removeAssignment(assignmentId: ID!, courseId: ID!): Assignment

    addHelpTicket(topic: String, githubRepo: String!, problemDescription: String!, ticketStatus: Boolean!): HelpTicket
    # updateHelpTicket

    # changeProgressStatus


# -------------------------------------------------------------------------------

    # addTeachingAssistant
    # updateTeachingAssistant
    # removeTeachingAssistant

    # updateInstructor
    # removeInstructor

    # updateAssignmentStatus

    # addThought(thoughtText: String!): Thought
    # addComment(thoughtId: ID!, commentText: String!): Thought
    # removeThought(thoughtId: ID!): Thought
    # removeComment(thoughtId: ID!, commentId: ID!): Thought
    
  }

  # ------------------------------------------------------------------------------------------

`;

module.exports = typeDefs;
