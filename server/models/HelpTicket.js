const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const helpTicketSchema = new Schema({

  student: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },      
  githubRepo: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  problemDescription: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const HelpTicket = model('Assignment', helpTicketSchema);

module.exports = HelpTicket;
