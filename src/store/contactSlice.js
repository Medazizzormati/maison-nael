import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { postJson } from '../api'

export const sendContact = createAsyncThunk('contact/send', async (form, { rejectWithValue }) => {
  try { await postJson('/contact', form); return true }
  catch (e) {
    if (e.status === 429) return rejectWithValue('Trop de messages envoyés. Réessayez plus tard.')
    if (e.status === 400) return rejectWithValue('Vérifiez les champs du formulaire.')
    return rejectWithValue('Le message n’a pas pu être envoyé. Réessayez plus tard.')
  }
})

const contactSlice = createSlice({
  name: 'contact',
  initialState: { status: 'idle', error: null },
  reducers: { resetContact: () => ({ status: 'idle', error: null }) },
  extraReducers: (b) => {
    b.addCase(sendContact.pending, (s) => { s.status = 'loading'; s.error = null })
     .addCase(sendContact.fulfilled, (s) => { s.status = 'done' })
     .addCase(sendContact.rejected, (s, a) => { s.status = 'idle'; s.error = a.payload || 'Le message n’a pas pu être envoyé.' })
  },
})
export const { resetContact } = contactSlice.actions
export default contactSlice.reducer
