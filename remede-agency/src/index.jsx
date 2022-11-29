//React
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

//Fichier
import Headers from './components/Headers/Headers'
import Home from './pages/Home/Home'
import SignIn from './pages/sign-in/SignIn'
import Profile from './pages/profile/Profile'
import Footer from './components/Footer/Footer'
import store from './utils/store'
//CSS
import './index.css'
/**
 * @return {string} HTML content of the application
 */
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Headers />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
)
