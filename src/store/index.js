import { configureStore } from '@reduxjs/toolkit'
import ui from './uiSlice'
import gallery from './gallerySlice'
import content from './contentSlice'
import contact from './contactSlice'
export const store = configureStore({ reducer: { ui, gallery, content, contact } })
