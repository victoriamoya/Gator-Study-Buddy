import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import chatService from './chatService'

const initialState = {
  chats: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

<<<<<<< HEAD
// Create new chat
=======
// Create new group
>>>>>>> 5f468920e8bcd3251105192e60953e22e57fd061
export const createChat = createAsyncThunk(
  'chats/create',
  async (chatData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await chatService.createChat(chatData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

<<<<<<< HEAD
// Get user chats
=======
// Get user groups
>>>>>>> 5f468920e8bcd3251105192e60953e22e57fd061
export const getChats = createAsyncThunk(
  'chats/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await chatService.getChats(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

<<<<<<< HEAD
// Delete user chat
=======
// Delete user group
>>>>>>> 5f468920e8bcd3251105192e60953e22e57fd061
export const deleteChat = createAsyncThunk(
  'chats/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await chatService.deleteChat(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createChat.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.chats.push(action.payload)
      })
      .addCase(createChat.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getChats.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getChats.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.chats = action.payload
      })
      .addCase(getChats.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteChat.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteChat.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.chats = state.chats.filter(
          (chat) => chat._id !== action.payload.id
        )
      })
      .addCase(deleteChat.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = chatSlice.actions
export default chatSlice.reducer