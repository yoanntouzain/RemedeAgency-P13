import { createSlice } from '@reduxjs/toolkit'

const baseUrl = 'http://localhost:3001/api/v1'

let initialState = {
  token: '',
  data: {},
  loading: false,
  error: false,
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
    return takeToken(responses)
  } else {
    responses = null
  }
}

async function takeToken(token) {
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
  },
})

export const { addToken, addDataStorage, addDataState } = loginValue.actions

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
