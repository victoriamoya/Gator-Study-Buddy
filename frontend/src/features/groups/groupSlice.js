import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import groupService from './groupService'

const initialState = {
  groups: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new group
export const createGroup = createAsyncThunk(
    'groups/create',
    async (groupData, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await groupService.createGroup(groupData, token)
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

// Get user groups
export const getGroups = createAsyncThunk(
    'groups/getAll',
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await groupService.getGroups(token)
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

// Delete user group
export const deleteGroup = createAsyncThunk(
    'groups/delete',
    async (id, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await groupService.deleteGroup(id, token)
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

export const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
        .addCase(createGroup.pending, (state) => {
          state.isLoading = true
        })
        .addCase(createGroup.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.groups.push(action.payload)
        })
        .addCase(createGroup.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        .addCase(getGroups.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getGroups.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.groups = action.payload
        })
        .addCase(getGroups.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        .addCase(deleteGroup.pending, (state) => {
          state.isLoading = true
        })
        .addCase(deleteGroup.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.groups = state.groups.filter(
              (group) => group._id !== action.payload.id
          )
        })
        .addCase(deleteGroup.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
  },
})

export const { reset } = groupSlice.actions
export default groupSlice.reducer
