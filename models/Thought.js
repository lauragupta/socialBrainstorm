const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

// Schema to create User model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String, 
      required: true,
      minlength: 1, 
      maxlength: 280,
    },
    createdAt: {
      type: Date, 
      default: Date.now,
      
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'reaction',
      },
    ],
  },
  {
    toJSON: {
    virtuals: true,
    },
  }
);

 // Create a virtual property `getReactions` that gets the number of reactions associated with a thought
thoughtSchema.virtual('getReactions').get(function () {
  return this.reactions.length;
});

// Initialize Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;