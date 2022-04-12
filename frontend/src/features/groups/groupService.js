import axios from 'axios'

const API_URL = '/api/groups/'

// Create new group
const createGroup = async (groupData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, groupData, config)

  return response.data
}

// Get user groups
const getGroups = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Delete user group
const deleteGroup = async (groupId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + groupId, config)

  return response.data
}

const groupService = {
  createGroup,
  getGroups,
  deleteGroup,
}

export default groupService
