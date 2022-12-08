import { createSlice } from '@reduxjs/toolkit'

const baseUrl = 'http://localhost:3001/api/v1'

let initialState = {
  email: '',
  password: '',
  data: {},
  firstName: '',
  lastName: '',
  email: '',
  error: false,
  connected: false,
  checkbox: false,
}

export async function login(email, password, checkbox) {
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
    if (checkbox) {
      localStorage.setItem('email', email)
      localStorage.setItem('password', password)
    } else {
      localStorage.removeItem('email')
      localStorage.removeItem('password')
    }
    responses = await response.json().then((response) => response.body.token)
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

export async function updateUser(firstName, lastName, token) {
  const response = await fetch(baseUrl + '/user/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
    }),
  }).then((response) => response)
  if (response.ok === true) {
    const data = await response.json().then((data) => data.body)
    return data
  } else {
    return null
  }
}

export const loginValue = createSlice({
  name: 'login',
  initialState,
  reducers: {
    addEmail: (state, action) => {
      state.email = action.payload
    },
    addPassword: (state, action) => {
      state.password = action.payload
    },
    addDataStorage: (state, action) => {
      localStorage.setItem('data', JSON.stringify(action.payload))
      state.data = action.payload
      return state
    },
    addEmailStorage: (state, action) => {
      localStorage.setItem('email', JSON.stringify(action.payload))
      state.email = action.payload
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
    addError: (state, action) => {
      state.error = action.payload
      return state
    },
    deleteError: (state, action) => {
      state.error = action.payload
      return state
    },
    checkboxValue: (state, action) => {
      localStorage.setItem('checkbox', action.payload)
      state.checkbox = action.payload
      return state
    },

    logout: (state, action) => {
      localStorage.removeItem('isConnected')
      localStorage.removeItem('data')
      localStorage.removeItem('lastName')
      localStorage.removeItem('firstName')
      localStorage.removeItem('token')
      state = initialState
      return state
    },
  },
})

export const {
  addEmail,
  addPassword,
  addToken,
  addDataStorage,
  addEmailStorage,
  addFirstName,
  addLastName,
  addConnected,
  addError,
  deleteError,
  resetStorage,
} = loginValue.actions
