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
      firstName
      lastName
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
