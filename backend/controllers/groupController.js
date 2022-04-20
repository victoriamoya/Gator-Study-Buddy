const asyncHandler = require('express-async-handler')
const Group = require('../models/groupModel')

const getGroups = asyncHandler(async (req, res) => {
  const radius = 5 // desired radius in miles
  const nearbyGroups = await Group.find({"lastLocation": // groups in specified radius
        {$geoWithin:
              {$centerSphere: [req.user.coordinates, radius/3963.2]} // divide radius by the equatorial radius of the earth, 3963.2 miles, to get the correct radian.
        }
  })

  res.status(200).json(nearbyGroups)
})

const setGroup = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const group = await Group.create({
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

const updateGroup = asyncHandler(async (req, res) => {
  const group = await Group.findById(req.params.id)

  if (!group) {
    res.status(400)
    throw new Error('Group not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  const updatedGroup = await Group.findByIdAndUpdate(req.params.id, req.body, {
    messages: {
      groupId: req.params.id,
      text: req.body.message,
      sender: req.user.name,
    }
  })

  res.status(200).json(updatedGroup)
})

const deleteGroup = asyncHandler(async (req, res) => {
  const group = await Group.findById(req.params.id)

  if (!group) {
    res.status(400)
    throw new Error('Group not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Check user is authorized to delete group
  if (group.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await group.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getGroups,
  setGroup,
  updateGroup,
  deleteGroup,
}
