const baseUrl = 'http://localhost:3001/api/v1'

export async function userLogin(email, password) {
  let result = await fetch(baseUrl + '/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email, password: password }),
  }).then((results) => results)
  if (result.ok === true) {
    return result.json().then((data) => data.body.token)
  } else {
    return null
  }
}

export async function userProfile(response) {
  let result = await fetch(baseUrl + '/user/profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + response,
    },
  }).then((results) => results.json().then((data) => data))
  return result
}
