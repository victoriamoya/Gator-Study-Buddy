const mongoose = require('mongoose')

const messageSchema = mongoose.Schema(
    {
        user: { // message sender ID
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        text: { // message body
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    });

module.exports = mongoose.model('Message', messageSchema)
