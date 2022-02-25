const { Schema, model } = require('mongoose');
const { isEmail } =require('validator');
 // Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String, 
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String, 
      required: true,
      unique: true,
      validate: [ isEmail, 'invalid email']
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId, 
        ref: 'Thought',
      },
    ],
    friends: [
      {
      type: Schema.Types.ObjectId, 
      ref: 'User',
      },
    ],
  },
  {
    toJSON: {
    virtuals: true,
    },
  }
);

 // Create a virtual property `getFriends` that gets the number of friends associated with a user
 userSchema.virtual('getFriends').get(function () {
  return this.friends.length;
});

// Initialize User model
const User = model('user', userSchema);

module.exports = User;