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



    // TODO: createCourse
      createCourse: async (parent, { courseTitle, courseDescription, instructor, teachingAssistant }, context) => {
      if (context.user) {
        const course = await Course.create({
          courseTitle, 
          courseDescription, 
          instructor, 
          teachingAssistant,
        });

        // await User.findOneAndUpdate(
        //   { _id: context.user._id },
        //   { $addToSet: { thoughts: thought._id } }
        // );

        return course;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    //  TODO: addStudentToCourse
        addStudentToCourse: async (parent, { courseId, userId }, context) => {
      // if (context.user) {
        return User.findOneAndUpdate(
          { _id: userId },
          {
            $addToSet: {
              courses: { courseId },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      // }
      throw new AuthenticationError('You need to be logged in!');
    },

    //  TODO: removeStudentFromCourse
    removeStudentFromCourse: async (parent, { courseId, userId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: userId },
          {
            $pull: {
              courses: {
                _id: courseId,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    

    //createAssignment
      createAssignment: async (parent, { course, courseId, assignmentTitle, assignmentDescription, assignmentDueDate }, context) => {
      // if (context.user) {
        const assignment = await Assignment.create({
          assignmentTitle,
          assignmentDescription,
          assignmentDueDate,
          course
        });

        await Course.findOneAndUpdate(
          { _id: courseId },
          { $addToSet: { assignments: assignment._id } }
        );

        return assignment;
      // }
      throw new AuthenticationError('You need to be logged in!');
    },
    //  TODO: updateAssignment
    updateAssignment: async (parent, { assignmentId, assignmentTitle, assignmentDescription, assignmentDueDate }, context) => {
      // if (context.user) {
       return await Assignment.findOneAndUpdate(
        { _id: assignmentId},
        {
          assignmentTitle,
          assignmentDescription,
          assignmentDueDate,
        },
        {new: true}
        );
      // }
      throw new AuthenticationError('You need to be logged in!');
    },
    //removeAssignment
    removeAssignment: async (parent, { courseId, assignmentId}, context) => {
      // if (context.user) {
        const assignment = await Assignment.findOneAndDelete({
          _id: assignmentId
        });

        await Course.findOneAndUpdate(
          { _id: courseId },
          { $pull: { assignments: assignment._id } }
        );

        return assignment;
      // }
      throw new AuthenticationError('You need to be logged in!');
    },
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


    //  TODO: removeAssignment
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
    


    //  TODO: addTeachingAssistant
    
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

    //  TODO: updateTeachingAssistant
        
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

    //  TODO: removeTeachingAssistant
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
    


    //  TODO: updateInstructor
    
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

    //  TODO: updateAssignmentStatus
    
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
