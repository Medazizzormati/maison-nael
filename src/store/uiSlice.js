import { createSlice } from '@reduxjs/toolkit'
const uiSlice = createSlice({
  name: 'ui',
  initialState: { menuOpen: false, introDone: false },
  reducers: { toggleMenu: (s) => { s.menuOpen = !s.menuOpen }, closeMenu: (s) => { s.menuOpen = false }, finishIntro: (s) => { s.introDone = true } },
})
export const { toggleMenu, closeMenu, finishIntro } = uiSlice.actions
export default uiSlice.reducer
