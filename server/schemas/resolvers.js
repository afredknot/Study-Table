const { AuthenticationError } = require('apollo-server-express');
const { User, Course, Assignment } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    
    users: async () => {
      return User.find().populate('courses').populate({
        path: 'courses',
        populate: 'assignments'
      });
    },

    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('courses').populate({
        path: 'courses',
        populate: 'assignments'
      });
    },
    
    courses: async () => {
    return Course.find().populate('assignments')
    },
    
    course: async (parent, { courseId }) => {
      return Course.findOne({ _id: courseId });
    },
    
    assignments: async () => {
      return Assignment.find()
    },
    
    assignment: async (parent, { assignmentID }) => {
      return Course.findOne({ _id: assignmentId });
    },
    
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('courses').populate({
          path: 'courses',
          populate: 'assignments'
        });
      }
      throw new AuthenticationError('You need to be logged in!');
    },

  },

  Mutation: {
    
    addUser: async (parent, { username, firstName, lastName, email, password }) => {
      const user = await User.create({ username, firstName, lastName, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },





    // createCourse
    
    // addStudentToCourse
    // removeStudentFromCourse

    // createAssignment
    // updateAssignment
    // removeAssignment

    // addTeachingAssistant
    // updateTeachingAssistant
    // removeTeachingAssistant

    // updateInstructor
    // removeInstructor

    // updateAssignmentStatus



    

    // addThought: async (parent, { thoughtText }, context) => {
    //   if (context.user) {
    //     const thought = await Thought.create({
    //       thoughtText,
    //       thoughtAuthor: context.user.username,
    //     });

    //     await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $addToSet: { thoughts: thought._id } }
    //     );

    //     return thought;
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },

    // addComment: async (parent, { thoughtId, commentText }, context) => {
    //   if (context.user) {
    //     return Thought.findOneAndUpdate(
    //       { _id: thoughtId },
    //       {
    //         $addToSet: {
    //           comments: { commentText, commentAuthor: context.user.username },
    //         },
    //       },
    //       {
    //         new: true,
    //         runValidators: true,
    //       }
    //     );
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },

    // removeThought: async (parent, { thoughtId }, context) => {
    //   if (context.user) {
    //     const thought = await Thought.findOneAndDelete({
    //       _id: thoughtId,
    //       thoughtAuthor: context.user.username,
    //     });

    //     await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $pull: { thoughts: thought._id } }
    //     );

    //     return thought;
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },
    
    // removeComment: async (parent, { thoughtId, commentId }, context) => {
    //   if (context.user) {
    //     return Thought.findOneAndUpdate(
    //       { _id: thoughtId },
    //       {
    //         $pull: {
    //           comments: {
    //             _id: commentId,
    //             commentAuthor: context.user.username,
    //           },
    //         },
    //       },
    //       { new: true }
    //     );
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },
  },
};

module.exports = resolvers;
