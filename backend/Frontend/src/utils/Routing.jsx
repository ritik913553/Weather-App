import React from 'react'
import {Route,Routes} from 'react-router-dom'
import HomePage from '../components/Home/HomePage.jsx'
import SearchBar from '../components/SearchBar.jsx'
import Login from '../components/Login.jsx'
import Signup from '../components/Signup.jsx'

const Routing = () => {
  return (
    <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/search' element={<SearchBar />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
    </Routes>
  )
}

export default Routing
