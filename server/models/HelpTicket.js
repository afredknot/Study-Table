const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const helpTicketSchema = new Schema({

  student: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },    
  topic: {
    type: String,
    minlength: 1,
    maxlength: 280,
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
  ticketStatus: {
    type: Boolean,
    required: true,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const HelpTicket = model('HelpTicket', helpTicketSchema);

module.exports = HelpTicket;
