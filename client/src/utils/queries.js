import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query users($username: String) {
    user(username: $username) {
      username
      role
      firstName
      lastName
      email
      password
      avatar
      _id
      courses {
        courseTitle
        createdAt
        _id
        instructor {
          username
          email
        }
      }
    }
  }
`;


export const QUERY_USER = gql`
  query user($id: ID!) {
    user(_id: $id) {
      username
      role
      firstName
      lastName
      email
      courses {
        courseTitle
        courseDescription
        instructor {
          username
          email
        }
        teachingAssistant {
          username
          email
        }
      }
    }
  }
`;

export const QUERY_THOUGHTS = gql`
  query getThoughts {
    thoughts {
      _id
      thoughtText
      thoughtAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleThought($thoughtId: ID!) {
    thought(thoughtId: $thoughtId) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
query me {
  me {
    username
    role
    firstName
    lastName
    email
    avatar
    courses {
      _id
      courseTitle
      courseDescription
      assignments {
        _id
        assignmentTitle
        assignmentDueDate
        assignmentDescription
        studentProgressWorking {
          username
        }
        studentProgressNotStarted {
          username
        }
        studentProgressCompleted {
          username
        }
      }
      instructor {
        username
        email
      }
      teachingAssistant {
        username
        email
      }
    }
  }
}
`;

export const QUERY_ASSIGNMENT = gql`
query assignment($assignmentId: ID!) {
  assignment(assignmentId: $assignmentId) {
    assignmentTitle
    helpTickets {
      topic
      problemDescription
      student {
        username
      }
      ticketStatus
      githubRepo
      createdAt
      _id
    }
  }
}
`;

export const QUERY_COURSES = gql`
query courses {
  courses {
    _id
    courseTitle
    assignments {
      _id
      assignmentTitle
    }
    teachingAssistant {
      username
      firstName
      lastName
    }
    instructor {
      username
      firstName
      lastName
    }
    students {
      _id
      username
      firstName
      lastName
    }
  }
}
`;
export const QUERY_COURSE = gql`
query course($courseId: ID!) {
  course(courseId: $courseId) {
    courseTitle
    assignments {
      assignmentTitle
      assignmentDueDate
      assignmentDescription
      createdAt
      _id
      helpTickets {
        topic
        ticketStatus
        student {
          username
        }
        problemDescription
        githubRepo
        createdAt
        _id
      }
    }
  }
}
`;

export const QUERY_TICKETS = gql`
query tickets {
  helpTickets {
    topic
    ticketStatus
    student {
      username
    }
    problemDescription
    githubRepo
    createdAt
    _id
  }
}
`;

export const QUERY_TICKET = gql`
query helpTicket($id: ID!) {
  helpTicket(_id: $id) {
    topic
    ticketStatus
    student {
      username
    }
    problemDescription
    githubRepo
    createdAt
  }
}
`;