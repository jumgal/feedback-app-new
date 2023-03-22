import {createSlice} from '@reduxjs/toolkit'
import { fetchUsers } from '../../thunks/auth/fetchUsers'

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        isLoading: false,
        data: [],
        errors: null
    },
    extraReducers(builder) {
      builder.addCase(fetchUsers.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
           state.isLoading = false
           state.data = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
         state.isLoading = false
         state.errors = action.payload
      })
    }
})

export const usersReducer = usersSlice.reducer