const { Schema } = require('mongoose');

const friendsSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
});

module.exports = friendsSchema;
