import { configureStore } from '@reduxjs/toolkit'
import { loginValue } from '../features/login'

export default configureStore({
  reducer: {
    login: loginValue.reducer,
  },
})
