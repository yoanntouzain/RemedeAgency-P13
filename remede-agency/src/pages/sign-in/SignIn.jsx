import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { userLogin } from '../../Services/ApiManager'

function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function connection(e) {
    e.preventDefault()
    let response = await userLogin(email, password)
    console.log(response)
    if (response != null) {
      navigate('/profile')
    } else {
      alert("L'identifiant ou le mot de passe sont incorrect")
    }
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        {/* Form */}
        <form onSubmit={connection}>
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
            <p className="errorMail">L'email est incorrect</p>
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
