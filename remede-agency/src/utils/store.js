import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/users'

export default configureStore({
  reducer: {
    user: authSlice,
  },
})
