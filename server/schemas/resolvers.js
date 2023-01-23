const { AuthenticationError } = require('apollo-server-express');
const { User, Course, Assignment, HelpTicket, Comment } = require('../models');
const { populate } = require('../models/User');
const { signToken } = require('../utils/auth');

const resolvers = {
 
  Query: {
    
    students: async () => {
      return User.find({})
      .find({role :"student"})
      .populate({
        path: 'courses', 
        populate: {
          path: "instructor"
        }
      })
      .populate({
        path: 'courses', 
        populate: {
          path: "teachingAssistant"
        }
      });
    },

    instructors: async () => {
      return User.find({})
      .find({role :"instructor" })
      .populate({
        path: 'courses', 
        populate: {
          path: "instructor"
        }
      })
      .populate({
        path: 'courses', 
        populate: {
          path: "teachingAssistant"
        }
      });
    },

    users: async () => {
      return User.find({})
      .populate({
        path: 'courses', 
        populate: {
          path: "instructor"
        }
      })
      .populate({
        path: 'courses', 
        populate: {
          path: "teachingAssistant"
        }
      });
    },

    user: async (parent, { _id }) => {
      return User.findOne({ _id: _id })
      .populate({
        path: 'courses', 
        populate: {
          path: "instructor"
        }
      })
      .populate({
        path: 'courses', 
        populate: {
          path: "teachingAssistant"
        }
      });
    },
    

    courses: async () => {
      return Course.find()
      .populate('instructor')
      .populate('students')
      .populate('teachingAssistant')
      .populate({
        path: 'assignments',
        populate: { path: 'helpTickets'}
      })
    },
    
    course: async (parent, { courseId }) => {
      return Course.findOne({ _id: courseId })
      .populate('instructor')
      .populate('students')
      .populate('teachingAssistant')
      .populate({
        path: 'assignments',
        populate: {
          path: 'comments', 
          populate: 'replies'}
        })
      .populate({
        path: 'assignments',
        populate: {
          path: 'helpTickets',
          populate: {path: 'student'}}
      });
    },
    
    
    assignments: async () => {
      return Assignment.find()
      .populate('studentDefaultStatus')
      .populate('requestingHelp')
      .populate('offeringAssistance')
      .populate('studentProgressNotStarted')
      .populate('studentProgressWorking')
      .populate('studentProgressCompleted')
      .populate({
        path: 'helpTickets',
        populate: { path: 'student'}
      })
      .populate({
        path: 'comments', 
        populate: 'replies'
      });


    },
    

    assignment: async (parent, { assignmentId }) => {
      return Assignment.findOne({ _id: assignmentId })
      .populate('requestingHelp')
      .populate('studentProgressNotStarted')
      .populate('studentProgressWorking')
      .populate('studentDefaultStatus')
      .populate('offeringAssistance')
      .populate({
        path: 'helpTickets',
        populate: { path: 'student'}
      })
      .populate({
        path: 'comments', 
        populate: {path: 'replies'}
      });

    },
    

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
        .populate('courses')
        .populate({
          path: 'courses', 
          populate: {
            path: "instructor"
          }
        }).populate({
          path: 'courses', 
          populate: {
            path: "teachingAssistant"
          }
        }).populate({
          path: 'courses', 
          populate: {
            path: "assignments"
          }
        })
      }
      throw new AuthenticationError('You need to be logged in!');
    },
 
    helpTickets: async () => {
        return HelpTicket.find()
        .populate('student')
        .populate({path: 'comments', 
          populate: { 
          path: 'replies'} })
    },

    helpTicket: async (parent, { _id }) => {
      return HelpTicket.findOne({ _id: _id })
      .populate('student')
      .populate({path: 'comments', 
        populate: { 
        path: 'replies'} })
      },
  },


  Mutation: {
    
    addUser: async (parent, { username, role, firstName, lastName, email, password }) => {
      const user = await User.create({ username, role, firstName, lastName, email, password });
      const token = signToken(user);
      return { token, user };
    },


    updateUserProfile: async (parent, { role, firstName, lastName, email, avatar, password, username }, context) => {
      // if (context.user) {
       return await User.findOneAndUpdate(
        { _id: context.user._id},
        {
          role,
          username,
          firstName,
          lastName,
          email,
          avatar,
          password, 
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


    createCourse: async (parent, { courseTitle, courseDescription, teachingAssistant }, context) => {
      // if (context.user) {
      const course = await Course.create({
        courseTitle, 
        courseDescription, 
        instructor: context.user._id, 
        teachingAssistant,
      });

      await User.findOneAndUpdate(
        { _id: context.user._id, },
        { $addToSet: { courses: course._id } },
        {
          new: true,
          runValidators: true,
        }
      );

      await User.findOneAndUpdate(
        { _id: teachingAssistant, },
        { $addToSet: { courses: course._id } },
        {
          new: true,
          runValidators: true,
        }
      );


      return course;
    // }
      throw new AuthenticationError('You need to be logged in!');
    },


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

      // Add all students in cours to default statuses in new assignment
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


    updateCourse: async (parent, { courseId, courseTitle, courseDescription, teachingAssistant }, context) => {
      // if (context.user) {
       const courseStart = await Course.findOne(
        { _id: courseId},
       );
       
       await User.findOneAndUpdate(
        { _id: courseStart.teachingAssistant, },
        { $pull: { courses: courseStart._id } },
        {
          new: true,
          runValidators: true,
        }
      );

       const courseUpdated = await Course.findOneAndUpdate(
        { _id: courseId},
        {
          courseTitle,
          courseDescription,
          teachingAssistant
        },
        {new: true}
        );

        await User.findOneAndUpdate(
          { _id: teachingAssistant, },
          { $addToSet: { courses: courseStart._id } },
          {
            new: true,
            runValidators: true,
          }
        );

          return courseUpdated;
      // }
      throw new AuthenticationError('You need to be logged in!');
    },


    deleteCourse: async (parent, { courseId }, context) => {
      // if (context.user) {
        const course = Course.findOne( {_id : courseId} )
          
        if(course.students>0){
          for(i=0; i<course.students; i++) {
            await User.findOneUpdate(
              { _id: course.students[i] },
              { $pull: { courses: course._id } }
            )
          };
        }

        await User.findOneAndUpdate(
          { _id: course.teachingAssistant },
          { $pull: { courses: course._id } },
        );

        await User.findOneAndUpdate(
          { _id: course.instructor },
          { $pull: { courses: course._id } },
        );

        await Course.findOneAndDelete({
          _id: courseId
        });

        return course;
      // }
      throw new AuthenticationError('You need to be logged in!');
    },

   
    addHelpTicket: async (parent, { assignmentId, topic, githubRepo, problemDescription }, context) => {
      if (context.user) {
        
        
        const helpTicket = await HelpTicket.create({
          student: context.user._id, 
          topic,
          githubRepo, 
          problemDescription, 
          ticketStatus: true
        });

        await Assignment.findOneAndUpdate(
          { _id: assignmentId },
          { $addToSet: { helpTickets: helpTicket._id, requestingHelp: context.user._id }, 
            $pull: { studentDefaultStatus: context.user._id, offeringAssistance: context.user._id } },
        );

        return helpTicket;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    updateHelpTicket: async (parent, { helpTicketId, topic, githubRepo, problemDescription, ticketStatus  }, context) => {
      // if (context.user) {
       return await HelpTicket.findOneAndUpdate(
        { _id: helpTicketId},
        {
          topic, 
          githubRepo, 
          problemDescription,
          ticketStatus
        },

        {new: true}
        );
      // }
      throw new AuthenticationError('You need to be logged in!');
    },


    changeProgressStatus: async (parent, { assignmentId, currentStatus, newStatus }, context) => {
      if (context.user) {
        const assignment =  await Assignment.findOneAndUpdate(
          { _id: assignmentId},
          
          { 
            $pull: { [`${currentStatus}`]: context.user._id }, 
            $addToSet: { [`${newStatus}`]: context.user._id } 
          },

          {new: true}
        );
        return assignment
      };
      throw new AuthenticationError('You need to be logged in!');
    },


    changeAssistanceStatus: async (parent, { assignmentId, currentStatus, newStatus }, context) => {
      if (context.user) {
        const assignment =  await Assignment.findOneAndUpdate(
          { _id: assignmentId},
          await
          { 
            $pull: { [`${currentStatus}`]: context.user._id }, 
            $addToSet: { [`${newStatus}`]: context.user._id } 
          },
          {new: true}
        );
        return assignment
      };
      throw new AuthenticationError('You need to be logged in!');
    },


    addComment: async (parent, { assignmentId, helpTicketId, commentText }, context) => {
      if (context.user) {
        const comment = await Comment.create({
          commentText,
          commentAuthor: context.user.username,
        });

        await HelpTicket.findOneAndUpdate(
          { _id: helpTicketId },
          { $addToSet: { comments: comment._id } }
        );

        await Assignment.findOneAndUpdate(
          { _id: assignmentId },
          { $addToSet: { comments: comment._id } }
        );

        return comment;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    removeComment: async (parent, { assignmentId, helpTicketId, commentId }, context) => {
      if (context.user) {
        const comment = await Comment.findOneAndDelete({
          _id: commentId,
          commentAuthor: context.user.username,
        });

        await HelpTicket.findOneAndUpdate(
          { _id: helpTicketId },
          { $pull: { Comments: comment._id } }
        );

        await Assignment.findOneAndUpdate(
          { _id: assignmentId },
          { $pull: { Comments: comment._id } }
        );

        return comment;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    addReply: async (parent, { commentId, replyText }, context) => {
      if (context.user) {
        return Comment.findOneAndUpdate(
          { _id: commentId },
          {
            $addToSet: {
              replies: { replyText, replyAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    
    removeReply: async (parent, { replyId, commentId }, context) => {
      if (context.user) {
        return Comment.findOneAndUpdate(
          { _id: commentId },
          {
            $pull: {
              replies: {
                _id: replyId,
                replyAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
