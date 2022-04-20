const express = require('express')
const router = express.Router()
const {
  getChats,
  setChat,
  updateChat,
  deleteChat,
} = require('../controllers/chatController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getChats).post(protect, setChat)
router.route('/:id').delete(protect, deleteChat)

module.exports = router