const router = require('express').Router();

const {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/')
    .get(getAllThoughts)

    // req.body should look like:
    // {
    //   "thoughtText": "Here's a cool thought...",
    //   "username": "lernantino",
    //   "userId": "5edff358a0fcb779aa7b118b"
    // }
    .post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(addReaction)

//route and controller to delete reaction