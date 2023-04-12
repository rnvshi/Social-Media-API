const { User, Thought } = require('../models');

module.exports = {
    getAllThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // req.body should look like:
    // {
    //   "thoughtText": "Here's a cool thought...",
    //   "username": "lernantino",
    //   "userId": "5edff358a0fcb779aa7b118b"
    // }
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) =>
                User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id } },
                    { runValidators: true, new: true },
                )
                    .then((updateUser) =>
                        !updateUser
                            ? res.status(404).json({ message: 'No user with that ID' })
                            : res.json(thought)
                    )
                    .catch((err) => res.status(500).json(err))
            )
            .catch((err) => res.status(500).json(err));
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true },
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteThought(req, res) {
        Thought.findOneAndRemove(
            { _id: req.params.thoughtId },
        )

            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })

                    // Remove thought ID from associated user
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { runValidators: true, new: true },
                    )
                        .then((user) =>
                            !user
                                ? res.status(404).json({ message: 'No user with that ID' })
                                : res.json(user)
                        )
                        .catch((err) => res.status(500).json(err))
            )
            .catch((err) => res.json(err));
    },

    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true },
        )
            .then((reaction) =>
                !reaction
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(reaction)
            )
            .catch((err) => res.json(err));
    },

    deleteReaction(req, res) {
        Thought.findByIdAndDelete(
            { _id: req.params.thoughtId },
            { $pull: { reactions: req.params.reactionId } },
            { runValidators: true, new: true },
        )

            .then((reaction) =>
                !reaction
                    ? res.status(404).json({ message: 'No thought or reaction with that ID' })
                    : res.json(reaction)
            )
            .catch((err) => res.json(err));
    },

};