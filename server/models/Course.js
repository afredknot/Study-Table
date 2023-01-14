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
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  instructor: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  teachingAssistant: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  assignments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Assignment',
    },
  ],
});

const Course = model('Course', courseSchema);

module.exports = Course;
