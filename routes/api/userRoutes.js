const router = require('express').Router();

const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/')
    .get(getAllUsers)

    // req.body should look like:
    // {
    // "username": "newuser"
    // "email": "newuser@email.com"
    //}
    .post(createUser);

// /api/users/:userId
router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    .put(addFriend)
    .delete(deleteFriend)
//BONUS: REMOVE USERS ASSOCIATED THOUGHTS WHEN DELETED
module.exports = router;