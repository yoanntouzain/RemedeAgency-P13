import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { userLogin, userProfile } from '../../Services/ApiManager'
import { useDispatch } from 'react-redux'
import { signUpUser, resultToken, addToken } from '../../features/users'

//CSS
import './signIn.css'

function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msgError, setMsgError] = useState(false)
  const navigate = useNavigate()

  // async function checkForm(e) {
  //   e.preventDefault()
  //   let response = await userLogin(email, password)
  //   if (response != null) {
  //     setMsgError(false)
  //     let data = await userProfile(response)
  //     // console.log(data)
  //     navigate('/profile')
  //   } else {
  //     setMsgError(true)
  //   }
  // }

  const dispatch = useDispatch()

  async function checkForm(e) {
    e.preventDefault()
    dispatch(signUpUser({ email, password }))
    // dispatch(resultToken())
    setTimeout(() => {
      dispatch(resultToken())
    }, 1000)

    // if (localStorage.getItem('token') != null) {
    //   dispatch(resultToken())
    //   setMsgError(false)
    // } else {
    //   setMsgError(true)
    // }
    setTimeout(() => {
      console.log(JSON.parse(localStorage.user))
    }, 2000)
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <p className={`errorUser ${msgError ? 'active' : ''} `}>
          L'email ou(et) le mot de passe est incorrect
        </p>
        {/* Form */}
        <form onSubmit={checkForm}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="email"
              id="username"
              name="username"
              placeholder="yoann@gmail.com"
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="username"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" name="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button">Sign In</button>
        </form>
      </section>
    </main>
  )
}

export default SignIn
