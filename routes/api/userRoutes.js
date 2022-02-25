const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser, 
  updateUser,
  deleteUser
} = require('../../controllers/user.Controller.js');

// /api/courses
router.route('/').get(getUsers).post(createUser);

// /api/courses/:courseId
router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;