const { Schema, model } = require('mongoose');
const moment = require('moment');
const Reaction = require('./Reaction');

// Schema to create Thought model

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD YYYY [at] hh:mm a'),
        },

        username: {
            type: String,
            required: true,
        },

        reactions: [Reaction],
    },

    {
        toJSON: { getters: true }
    },

);

thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length
    })
    .set(function (reactionCount) {
        this.set({ reactionCount });
    });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;