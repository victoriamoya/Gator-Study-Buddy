const express = require('express')
const router = express.Router()
const {
  getGroups,
  setGroup,
  updateGroup,
  deleteGroup,
} = require('../controllers/groupController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getGroups).post(protect, setGroup)
router.route('/:id').delete(protect, deleteGroup).put(protect, updateGroup)

module.exports = router
