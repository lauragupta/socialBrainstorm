const { User, Thought } = require('../models');

const userThoughtList = async () =>
  User.aggregate([
    {
      $unwind: '$thoughts',
    }
  ]);

// const frinedList = async () => 
//   User.aggregate([
//   {
//     $unwind: '$friends',
//   }
// ]);

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
              user,
              thoughts: await userThoughtList(req.params.userId),
              //friends: await getFriends,
              //friends: await frinedList(req.params.userId),
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // Update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this ID!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  
  // Delete a user 
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) => {
        const result = !user
          ? res.status(404).json({ message: 'No such user exists with that ID' })
          : Thought.deleteMany({ 
            _id: { 
              $in: user.thoughts 
            }})
        return result
      })
      .then((user) =>
        !user.thoughts
          ? res.status(404).json({ 
            message: 'User deleted, but no thoughts found',
            })
          : res.json({ message: 'User and Thoughts successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Adds a friend to a user. 
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => {
        res.status(500).json(err);
        console.log(err);
      });
  },
   // Remove user friend. 
   removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: { friendsId: req.params.friendsId } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

};
