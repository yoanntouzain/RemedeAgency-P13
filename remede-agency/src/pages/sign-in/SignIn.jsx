import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addDataStorage,
  login,
  addConnected,
  addFirstName,
  addLastName,
  addDataState,
  deleteError,
  addError,
  addEmail,
  addPassword,
} from '../../features/login'

//CSS
import './signIn.css'

function SignIn() {
  const [msgError, setMsgError] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userEmail = useSelector((state) => state.login.email)
  const userPassword = useSelector((state) => state.login.password)
  let emailStorage = localStorage.getItem('email')
  let passwordStorage = localStorage.getItem('password')

  async function checkEmailStorage(emailStorage) {
    if (emailStorage && passwordStorage != null) {
      dispatch(addEmail(emailStorage))
      dispatch(addPassword(passwordStorage))
    }
  }
  checkEmailStorage(emailStorage)
  async function checkForm(e) {
    e.preventDefault()
    const checkBox = document.getElementById('remember-me')
    const response = await login(userEmail, userPassword, checkBox.checked)
    if (response != null) {
      dispatch(addDataStorage(response))
      dispatch(addDataState(localStorage.getItem('data')))
      dispatch(addConnected(true))
      dispatch(addFirstName(response.firstName))
      dispatch(addLastName(response.lastName))
      dispatch(deleteError(false))
      setMsgError(false)
      navigate('/profile')
    } else {
      dispatch(addError(true))
      dispatch(addConnected(false))
      setMsgError(true)
    }
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
              value={userEmail}
              onChange={(e) => {
                dispatch(addEmail(e.target.value))
              }}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="username"
              value={userPassword}
              onChange={(e) => {
                dispatch(addPassword(e.target.value))
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
