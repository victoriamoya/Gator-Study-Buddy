const asyncHandler = require('express-async-handler')
const Chat = require('../models/chatModel')
const User = require('../models/userModel')


const getChats = asyncHandler(async (req, res) => {
  const radius = 5 // desired radius in miles
  const nearbyChats = await Chat.find({"lastLocation": // groups in specified radius
        {$geoWithin:
              {$centerSphere: [req.user.coordinates, radius/3963.2]} // divide radius by the equatorial radius of the earth, 3963.2 miles, to get the correct radian.
        }
  })

  res.status(200).json(nearbyChats)
})


const setChat = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const chat = await Chat.create({
    "text": req.body.text,
    "user": req.user.id,
    "name": req.user.name,
    "latitude": req.body.latitude,
    "longitude": req.body.longitude,
    "lastLocation": {
      type: "Point",
      coordinates: [req.body.longitude, req.body.latitude],
      index: "2dsphere"
    },
  })

  res.status(200).json(group)
})


const updateChat = asyncHandler(async (req, res) => {
  const chat = await Chat.findById(req.params.id)

  if (!chat) {
    res.status(400)
    throw new Error('Chat not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the group user
  if (chat.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedChat = await Chat.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedChat)
})

const deleteChat = asyncHandler(async (req, res) => {
  const chat = await Chat.findById(req.params.id)

  if (!chat) {
    res.status(400)
    throw new Error('Chat not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the group user
  if (chat.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await chat.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getChats,
  setChat,
  updateChat,
  deleteChat,
}