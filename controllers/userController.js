const { User, Thought } = require('../models');

module.exports = {
    getAllUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json({ message: `Welcome to the community, ${user.username}. Your account has been created.` }))
            .catch((err) => res.status(500).json(err));
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true },
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteUser(req, res) {
        User.findOneAndRemove(
            { _id: req.params.userId },
        )

            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json({ message: `We are sorry to see you go, ${user.username}. Your account has been deleted.` })
            )
            .catch((err) => res.status(500).json(err));
    },

    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true },
        )

            .then((user1) =>
                !user1
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : User.findOneAndUpdate(
                        { _id: req.params.friendId },
                        { $addToSet: { friends: req.params.userId } },
                        { runValidators: true, new: true },
                    )
                        .then((user2) =>
                            !user2
                                ? res.status(404).json({ message: 'No user with that ID' })
                                : res.json({ message: `${user1.username} and ${user2.username} are now friends.` })
                        )
                        .catch((err) => res.status(500).json(err))
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true },
        )
            .then((user1) =>
                !user1
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : User.findOneAndUpdate(
                        { _id: req.params.friendId },
                        { $pull: { friends: req.params.userId } },
                        { runValidators: true, new: true },
                    )

                        .then((user2) =>
                            !user2
                                ? res.status(404).json({ message: 'No user with that ID' })
                                : res.json({ mesage: `${user1.username} and ${user2.username} are no longer friends.` })
                        )
                        .catch((err) => res.status(500).json(err))
            )
            .catch((err) => res.json(err));
    },
};