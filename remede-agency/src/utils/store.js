import { configureStore } from '@reduxjs/toolkit'
import { loginValue } from '../features/login'
// import { modalSlice } from '../features/modal'

export default configureStore({
  reducer: {
    login: loginValue.reducer,
    // modal: modalSlice.reducer,
  },
})
