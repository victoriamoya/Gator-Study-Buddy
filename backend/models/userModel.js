const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    coordinates: [0, 0],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
