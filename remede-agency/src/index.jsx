//React
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//Fichier
import Headers from './components/Headers/Headers'
import Home from './pages/Home/Home'
import SignIn from './pages/sign-in/SignIn'
import User from './pages/user/User'
import Footer from './components/Footer/Footer'
//CSS
import './index.css'
/**
 * @return {string} HTML content of the application
 */
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Headers />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/user" element={<User />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
)
