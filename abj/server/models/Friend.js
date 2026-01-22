const { Schema } = require('mongoose');

const friendsSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: { type: String, default: 'pending' }

});

module.exports = friendsSchema;
