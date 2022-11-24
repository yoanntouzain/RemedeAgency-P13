const baseUrl = 'http://localhost:3001/api/v1'

export async function userLogin(email, password) {
  let result = await fetch(baseUrl + '/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email, password: password }),
  }).then((results) => results)
  if (result.statusText === 'OK') {
    return result
  } else {
    return null
  }
}
