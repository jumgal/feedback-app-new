import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const fetchFeedbacks = createAsyncThunk('feedbacks/fetch-all-feedbacks', async () => {
    const response = await axios.get('api/feedbacks')
    return response.data
})

export {fetchFeedbacks}