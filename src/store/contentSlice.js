import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { creations as local } from '../data/maison'
import { getJson } from '../api'

// Loads creations and photos from the Spring Boot API. If the API is unreachable, the static data in maison.js stays in use.
export const fetchContent = createAsyncThunk('content/fetch', async () => {
  const [creations, photos] = await Promise.all([getJson('/creations'), getJson('/photos')])
  return { creations, photos }
})

const contentSlice = createSlice({
  name: 'content',
  initialState: { creations: local, source: 'local' },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchContent.fulfilled, (s, a) => {
      if (a.payload.creations.length) { s.creations = a.payload.creations; s.source = 'api' }
    })
  },
})
export default contentSlice.reducer
