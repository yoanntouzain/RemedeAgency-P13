import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addDataStorage,
  login,
  addConnected,
  addFirstName,
  addLastName,
  deleteError,
  addError,
  addEmailStorage,
  checkboxValue,
} from '../../features/login'

//CSS
import './signIn.css'

function SignIn() {
  let checkbox = document.getElementById('remember-me')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msgError, setMsgError] = useState(false)
  const navigate = useNavigate()
  const user = useSelector((state) => state.login.email)
  console.log(user)

  const dispatch = useDispatch()

  function checked(checkbox) {
    if (checkbox) {
      dispatch(addEmailStorage(email))
      dispatch(checkboxValue(checkbox))
    } else {
      dispatch(checkboxValue(checkbox))
    }
  }

  async function checkForm(e) {
    e.preventDefault()
    const response = await login(email, password)
    console.log(email)
    console.log(password)
    if (response != null) {
      checked(checkbox.checked)
      dispatch(addDataStorage(response))
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
