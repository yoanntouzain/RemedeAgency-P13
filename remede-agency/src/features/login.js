import { createSlice } from '@reduxjs/toolkit'

const baseUrl = 'http://localhost:3001/api/v1'

let initialState = {
  data: {},
  firstName: '',
  lastName: '',
  loading: false,
  error: false,
  connected: false,
}

export async function login(email, password) {
  let responses = ''
  const response = await fetch(baseUrl + '/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then((results) => results)
  if (response.ok === true) {
    responses = await response.json().then((response) => response.body.token)
    localStorage.setItem('token', JSON.stringify(responses))
    return takeToken(responses)
  } else {
    responses = null
  }
}

export async function takeToken(token) {
  const response = await fetch(baseUrl + '/user/profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  })
  const data = await response.json().then((res) => res.body)
  return data
}

export const loginValue = createSlice({
  name: 'login',
  initialState,
  reducers: {
    addToken: (state, action) => {
      localStorage.setItem('token', JSON.stringify(action.payload))
      state.token = action.payload
      return state
    },
    addDataStorage: (state, action) => {
      localStorage.setItem('data', JSON.stringify(action.payload))
    },
    addDataState: (state, action) => {
      state.data = JSON.parse(action.payload)
      return state
    },
    addFirstName: (state, action) => {
      localStorage.setItem('firstName', JSON.stringify(action.payload))
      state.firstName = action.payload
      return state
    },
    addLastName: (state, action) => {
      localStorage.setItem('lastName', JSON.stringify(action.payload))
      state.lastName = action.payload
      return state
    },
    addConnected: (state, action) => {
      localStorage.setItem('isConnected', action.payload)
      state.connected = localStorage.getItem('isConnected')
      return state
    },
    resetStorage: (state, action) => {
      localStorage.clear()
      state = initialState
      return state
    },
  },
})

export const {
  addToken,
  addDataStorage,
  addDataState,
  addFirstName,
  addLastName,
  addConnected,
  resetStorage,
} = loginValue.actions

// export const login = createAsyncThunk('login', async (body) => {
//   const response = await fetch(baseUrl + '/user/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ email: 'tony@stark.com', password: 'password123' }),
//   })
//   const data = await response.json()
//   return data
// })
