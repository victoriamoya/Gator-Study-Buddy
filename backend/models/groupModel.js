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

const groupSchema = mongoose.Schema(
{
    user: { // group owner
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    text: {
        type: String,
        required: [true, 'Please add a text value'],
    },
    latitude: {
        type: Number,
        required: [true]
    },
    longitude: {
        type: Number,
        required: [true]
    },
    lastLocation: {
        type: pointSchema,
        default: {
            type: "Point",
            coordinates: [0, 0], // longitude [-180, 180], latitude [-90, 90]
        },
        index: "2dsphere",
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model('Group', groupSchema)
