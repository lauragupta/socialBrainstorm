const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  updateThought,
  deleteThought,
  createThought, 
  addThoughtReaction,
  removeThoughtReaction
} = require('../../controllers/thoughtController.js');

//api/thoughts
router.route('/').get(getThoughts).post(createThought);

//api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thought/:thoughtId/reaction
router.route('/:thoughtId/reactions').post(addThoughtReaction);

// /api/thought/:thoughtId/reaction/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeThoughtReaction);

  module.exports = router;