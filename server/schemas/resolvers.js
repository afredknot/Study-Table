const { AuthenticationError } = require('apollo-server-express');
const { User, Course, Assignment, HelpTicket } = require('../models');
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
    return Course.find().populate('assignments').populate('instructor').populate('students').populate('teachingAssistant')
    },
    
    course: async (parent, { courseId }) => {
      return Course.findOne({ _id: courseId });
    },
    
    
    assignments: async () => {
      return Assignment.find().populate('requestingHelp').populate('studentProgressNotStarted').populate('studentDefaultStatus').populate({
        path: 'requestingHelp',
        populate: 'student'
      });
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
    
    addUser: async (parent, { username, role, firstName, lastName, email, password }) => {
      const user = await User.create({ username, role, firstName, lastName, email, password });
      const token = signToken(user);
      return { token, user };
    },

    updateUserProfile: async (parent, { userId, role, firstName, lastName, email, avatar, password }, context) => {
      // if (context.user) {
       return await User.findOneAndUpdate(
        { _id: userId},
        {
          role,
          firstName,
          lastName,
          email,
          avatar,
          password
        },
        {new: true}
        );
      // }
      throw new AuthenticationError('You need to be logged in!');
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

      // if (context.user) {
      const course = await Course.create({
        courseTitle, 
        courseDescription, 
        instructor, 
        teachingAssistant,
      });

      return course;
    // }
      throw new AuthenticationError('You need to be logged in!');
    },

    //  TODO: addStudentToCourse
    addStudentToCourse: async (parent, { userId, courseId }) => {
      
      // if (context.user) {
         await User.findOneAndUpdate(
          { _id: userId },
          { $addToSet: { courses: courseId } },
          {
            new: true,
            runValidators: true,
          }
        );

        const course = await Course.findOneAndUpdate(
          { _id: courseId },
          { $addToSet: { students: userId } },
          {
            new: true,
            runValidators: true,
          }
        );

        return course;
      // }
         throw new AuthenticationError('You need to be logged in!');
    },


    //  TODO: removeStudentFromCourse
    removeStudentFromCourse: async (parent, { userId, courseId }) => {
      // if (context.user) {
        return User.findOneAndUpdate(
          { _id: userId },
          { $pull: { courses: courseId } },
          {
            new: true,
            runValidators: true,
          }
        );
      // }
         throw new AuthenticationError('You need to be logged in!');
    },


  //createAssignment
    createAssignment: async (parent, { courseId, assignmentTitle, assignmentDescription, assignmentDueDate }, context) => {
    // if (context.user) {
      const assignment = await Assignment.create({
        assignmentTitle,
        assignmentDescription,
        assignmentDueDate,
      });

      const course = await Course.findOneAndUpdate(
        { _id: courseId },
        { $addToSet: { assignments: assignment._id } }
      );
      
      

      for(i=0; i<course.students.length; i++){
        console.log(course.students[i])
        await Assignment.findOneAndUpdate(
          { _id: assignment._id  },
          { $addToSet: { studentProgressNotStarted: course.students[i], studentDefaultStatus: course.students[i] } },
        );
      }
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

    updateCourse: async (parent, { courseId, courseTitle, courseDescription, teachingAssistant }, context) => {
      // if (context.user) {
       return await Course.findOneAndUpdate(
        { _id: courseId},
        {
          courseTitle,
          courseDescription,
          teachingAssistant
        },

        {new: true}
        );
      // }
      throw new AuthenticationError('You need to be logged in!');
    },

    deleteCourse: async (parent, { courseId }, context) => {
      // if (context.user) {
        const course = Course.findOne(
          {_id : courseId}
          )
          if(course.students<0){
          for(i=0; i<course.students; i++) {
        await User.findOneUpdate(
          { _id: course.students[i] },
          { $pull: { courses: course._id } }
        )};
        }
        await Course.findOneAndDelete({
          _id: courseId
        });
      // }
      throw new AuthenticationError('You need to be logged in!');
    },


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
    
    // updateAssignmentStatus: async (parent, { thoughtId, commentId }, context) => {
    //   // if (context.user) {
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
    //   // }
    //   throw new AuthenticationError('You need to be logged in!');
    // },

    //  TODO: addHelpTicket
    
    addHelpTicket: async (parent, { assignmentId, topic, githubRepo, problemDescription }, context) => {
      // if (context.user) {
        const helpTicket = await HelpTicket.create({
          student: context.user._id, 
          topic,
          githubRepo, 
          problemDescription, 
          ticketStatus: true
        });

        await Assignment.findOneAndUpdate(
          { _id: assignmentId },
          { $addToSet: { requestingHelp: helpTicket._id } },
          { $pull: { studentDefaultStatus: context.user._id, offeringAssistance: context.user._id } },
        );

        return helpTicket;
      // }
      throw new AuthenticationError('You need to be logged in!');
    },

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
    
  },
};

module.exports = resolvers;
