import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import groupReducer from '../features/groups/groupSlice'
import chatReducer from '../features/chats/chatSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    groups: groupReducer,
    chats: chatReducer,
  },
})
