const mongoose = require('mongoose');

const moment = require('moment');

const chatSchema = new mongoose.Schema({
  userOne: { type: mongoose.Schema.ObjectId, ref: 'User' },
  userTwo: { type: mongoose.Schema.ObjectId, ref: 'User' },
  userToDisplay: { type: mongoose.Schema.ObjectId, ref: 'User' },
  messages: [{
    sentBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
    content: { type: String, required: true },
    timestamps: { type: String, default: moment().format('YYYY-MM-DD HH:mm') }
  }]
});

module.exports = mongoose.model('Chat', chatSchema);
