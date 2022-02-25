 const { Schema, model } = require('mongoose');
import { isEmail } from 'validator'
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
     thoughts: {
       type: Schema.Types.ObjectId, 
       ref: 'Thought',
     },
     friends: {
      type: Schema.Types.ObjectId, 
      ref: 'User',
     },
   },
    {
    toJSON: {
      virtuals: true,
    },
  }
 );

 // Create a virtual property `getthoughts` that gets the amount of thoughts associated with a user
userSchema.virtual('getThoughts').get(function () {
  return this.thoughts;
});

userSchema.virtual('getFriends').get(function () {
  return this.friends.length;
});

// Initialize User model
const User = model('user', userSchema);

module.exports = User;