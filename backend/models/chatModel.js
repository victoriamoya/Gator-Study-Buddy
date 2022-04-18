const mongoose = require('mongoose')

const pointSchema = mongoose.Schema({ // for mongodb geospatial queries
    type: {
        type: String,
        enum: ["Point"],
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    },
});

const chatSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        },
        lastLocation: {
            type: pointSchema,
            default: {
                type: "Point",
                coordinates: [0, 0], // longitude [-180, 180], latitude [-90, 90]
            },
            index: "2dsphere",
        },
        groupId: ""
    },
    {
        timestamps: true,
    });

module.exports = mongoose.model('Chat', chatSchema)