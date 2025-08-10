import { useState } from 'react'
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router'

//layouts
import PublicLayout from './Layout/PublicLayout'
import AdminLayout from './Layout/AdminLayout'

//pages
import Home from './Pages/Home/Home'
import Branches from './Pages/Branches/Branches'
import Finance from './Pages/Finance/Finance'


//admin pages
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
//protected routes
import ProtectedRoutes from './Components/ProtectedRoutes'

function App() {


  return (
    <>
      
      <Routes>
        {/* this are only for login admin */}
        {/* <Route element={<Login/>} path='/Login'/>
        <Route element={<Register/>} path='/Register'/> */}

        {/* this section is accessible to anyone having link to website */}
        <Route element={<PublicLayout/>}>
          <Route element={<Home/>} path='/'/>
          <Route element={<Branches/>} path='/Branches'/>
          <Route element={<Finance/>} path='/Finance'/>
        </Route>

        {/* this is reserved to admin */}
      </Routes>
      
    </>
  )
}

export default App
