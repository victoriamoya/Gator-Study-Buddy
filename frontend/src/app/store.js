import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import groupReducer from '../features/groups/groupSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    groups: groupReducer,
  },
})
