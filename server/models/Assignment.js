const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const assignmentSchema = new Schema({
  assignmentTitle: {
    type: String,
    required: 'The assignment must have a name',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  assignmentDescription: {
    type: String,
    required: true,
    trim: true,
  },
  assignmentDueDate: {
    type: Date,
    required: true,
    trim: true,
  },
  course: {
    type: String,
    required: true,
    ref: 'Course',
  },
  studentProgressNotStarted:     {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  studentProgressWorking:     {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  studentProgressCompleted:    {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }, 
  studentDefaultStatus: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  requestingHelp: [
    {
      type: Schema.Types.ObjectId,
      ref: 'HelpTicket',
    },
  ],
  offeringAssistance: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Assignment = model('Assignment', assignmentSchema);

module.exports = Assignment;
