import React from 'react'
import argentBankLogo from '../../assets/argentBankLogo.png'
import { Link, useNavigate } from 'react-router-dom'

function Headers() {
  const navigate = useNavigate()
  let checkbox = JSON.parse(localStorage.getItem('checkbox'))
  let isConnected = localStorage.getItem('isConnected')

  function isLogout() {
    console.log(checkbox)
    localStorage.removeItem('token')
    localStorage.removeItem('checkbox')
    localStorage.removeItem('data')
    localStorage.removeItem('isConnected')
    localStorage.removeItem('firstName')
    localStorage.removeItem('lastName')
    navigate('/login')
  }

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <Link
          className={`main-nav-item signIn ${isConnected ? 'display' : ''}`}
          to="/login"
        >
          <i className="fa fa-user-circle space"></i>
          Sign In
        </Link>
        <Link
          className={`main-nav-item logout ${isConnected ? '' : 'display'}`}
          onClick={isLogout}
          to="/login"
        >
          <i className="fa fa-user-circle space"></i>
          Logout
        </Link>
      </div>
    </nav>
  )
}

export default Headers
