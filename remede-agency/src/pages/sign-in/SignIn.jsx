import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { userLogin } from '../../Services/ApiManager'

//CSS
import './signIn.css'

function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msgError, setMsgError] = useState(false)
  const navigate = useNavigate()

  async function checkForm(e) {
    e.preventDefault()
    let response = await userLogin(email, password)
    // console.log(response.body.token)
    if (response != null) {
      setMsgError(false)
      navigate('/profile')
    } else {
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
