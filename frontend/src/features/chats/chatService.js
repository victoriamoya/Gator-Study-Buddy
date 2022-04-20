import axios from 'axios'

const API_URL = '/api/chats/'

// Create new chat
const createChat = async (chatData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL, chatData, config)

    return response.data
}

// Get user chats
const getChats = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

// Delete user chat
const deleteChat = async (chatId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(API_URL + chatId, config)

    return response.data
}

const chatService = {
    createChat,
    getChats,
    deleteChat,
}

export default chatService