const { Schema, model } = require('mongoose');

// Schema to create User model

const userSchema = new Schema(
    {
        username: {
            type: String,
            trim: true,
            unique: true,
            required: true,
        },

        email: {
            type: String,
            unique: true,
            required: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/, 'Please provide a valid email address'],
            // review this regex
        },

        thoughts: {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        },

        friends: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    });

userSchema
    .virtual('friendCount')
    .get(function () {
        return $(this.friends.length);
    })
    .set(function (friendCount) {
        this.set({ friendCount });
    });

const User = model('user', userSchema);

module.exports = User;