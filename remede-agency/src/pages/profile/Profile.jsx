import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setFirstName, setLastName } from '../../features/modal'
import './profile.css'

function User() {
  const dispatch = useDispatch()
  let firstName = JSON.parse(localStorage.getItem('firstName'))
  let lastName = JSON.parse(localStorage.getItem('lastName'))

  const [firstNames, setFirstNames] = useState('')
  const [lastNames, setLastNames] = useState('')
  const navigate = useNavigate()

  function editName() {
    dispatch(setFirstName(firstNames))
    dispatch(setLastName(lastNames))
    navigate('/profile')

    console.log('hello!')
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1 id="test">
          Welcome back
          <br />
          {firstName + ' '}
          {lastName + '!'}
        </h1>
        <form>
          <div className="editName">
            <div>
              <input
                type="text"
                id="firstName"
                onChange={(e) => {
                  setFirstNames(e.target.value)
                }}
                required
              />
              <input
                type="text"
                id="lastName"
                onChange={(e) => {
                  setLastNames(e.target.value)
                }}
                required
              />
              <div>
                <button className="edit-button" onClick={editName}>
                  Edit Name
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  )
}
export default User
