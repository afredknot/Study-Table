const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const courseSchema = new Schema({
  courseTitle: {
    type: String,
    required: 'The course must have a name',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  courseDescription: {
    type: String,
    required: true,
    trim: true,
  },
  instructor: {
    type: Schema.Types.ObjectId,
    required: true,
    trim: true,
    ref: 'User',
  },
  teachingAssistant: {
    type: Schema.Types.ObjectId,
    trim: true,
    ref: 'User',
  },
  assignments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Assignment',
    },
  ],
  students: [
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

const Course = model('Course', courseSchema);

module.exports = Course;
