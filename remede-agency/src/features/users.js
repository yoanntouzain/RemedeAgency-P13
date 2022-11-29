import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const baseUrl = 'http://localhost:3001/api/v1'
const initialState = {
  msg: '',
  user: '',
  token: '',
  loading: false,
  error: '',
}

export const signUpUser = createAsyncThunk('signUpUser', async (body) => {
  const response = await fetch(baseUrl + '/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  if (response.ok === true) {
    return response.json().then((data) => data)
  } else {
    return null
  }
})

export const resultToken = createAsyncThunk('resultToken', async () => {
  const response = await fetch(baseUrl + '/user/profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.token,
    },
  })
  if (response.ok === true) {
    return response.json().then((data) => data)
  } else {
    return null
  }
})

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.token = localStorage.getItem('token')
    },
    addUser: (state, action) => {
      state.user = localStorage.getItem('user')
    },
    logout: (state, action) => {
      state.token = null
      localStorage.clear()
    },
  },
  extraReducers: {
    [signUpUser.pending]: (state, action) => {
      state.loading = true
    },
    [signUpUser.fulfilled]: (
      state,
      {
        payload: {
          error,
          message,
          body: { token },
        },
      }
    ) => {
      state.loading = false
      if (error) {
        state.error = error
      } else {
        state.msg = message
        state.token = token
        localStorage.setItem('message', message)
        localStorage.setItem('token', token)
      }
    },
    [signUpUser.rejected]: (state, action) => {
      state.loading = false
    },
    [resultToken.pending]: (state, action) => {
      state.loading = true
    },
    [resultToken.fulfilled]: (state, { payload: { error, message, body } }) => {
      state.loading = false
      if (error) {
        state.error = error
      } else {
        state.msg = message
        state.user = body
        localStorage.setItem('message', message)
        localStorage.setItem('user', JSON.stringify(body))
      }
    },
    [resultToken.rejected]: (state, action) => {
      state.loading = false
    },
  },
})

export const { addToken, addUser, logout } = authSlice.actions

export default authSlice.reducer
