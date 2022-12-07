import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  addDataStorage,
  login,
  addConnected,
  addFirstName,
  addLastName,
  addDataState,
  deleteError,
  addError,
} from '../../features/login'

//CSS
import './signIn.css'

function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msgError, setMsgError] = useState(false)
  const navigate = useNavigate()

  const dispatch = useDispatch()

  async function checkForm(e) {
    e.preventDefault()
    const response = await login(email, password)
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
